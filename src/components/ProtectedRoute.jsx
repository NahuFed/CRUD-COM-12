import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyAuth } from "../helpers/queriesUsuarios";

// Componente para proteger rutas que requieren autenticación
// Ahora funciona con cookies JWT en lugar de localStorage únicamente
const ProtectedRoute = ({ children, role }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Primero intentar verificar con el servidor (cookie JWT)
                const authResult = await verifyAuth();
                
                if (authResult.success) {
                    setIsAuthenticated(true);
                    setUserRole(authResult.user.role);
                } else {
                    // Si falla la verificación del servidor, revisar localStorage como fallback
                    const localUser = localStorage.getItem('user');
                    if (localUser) {
                        const userData = JSON.parse(localUser);
                        setIsAuthenticated(true);
                        setUserRole(userData.role);
                    } else {
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                // Fallback a localStorage si hay error de red
                const localUser = localStorage.getItem('user');
                if (localUser) {
                    const userData = JSON.parse(localUser);
                    setIsAuthenticated(true);
                    setUserRole(userData.role);
                } else {
                    setIsAuthenticated(false);
                }
            }
        };

        checkAuth();
    }, []);

    // Mostrar loading mientras verificamos autenticación
    if (isAuthenticated === null) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div>Verificando autenticación...</div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si se requiere un rol específico y el usuario no lo tiene, redirigir
    if (role && userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    // Si todo está bien, mostrar el componente hijo
    return children;
};

export default ProtectedRoute;