import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyAuth, logout as logoutService } from "../helpers/queriesUsuarios";
import "./Header.css";

function Header() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Verificar el rol real desde el token al cargar
    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkUserAuth = async () => {
        try {
            const authResult = await verifyAuth();
            if (authResult.success) {
                setUser(authResult.user);
                // Sincronizar localStorage con datos reales
                localStorage.setItem('user', JSON.stringify(authResult.user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Logout completo (cookie + localStorage)
    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutService(); // Elimina la cookie JWT del backend
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Limpiar localmente aunque falle el backend
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const isAdmin = user && user.role === 'admin';

    if (loading) {
        return <div>Cargando...</div>; // O tu componente de loading
    }

    return (
        <header className="header">
            <nav className="nav-container">
                <div className="nav-brand">
                    <h1 className="brand-title">Mi Tienda</h1>
                </div>
                
                <div className="nav-links">
                    <NavLink to="/" className="nav-link">
                        🏠 Inicio
                    </NavLink>
                    
                    {!user && (
                        <NavLink to="/login" className="nav-link">
                            🔑 Login
                        </NavLink>
                    )}

                    {isAdmin && (
                        <>
                            <NavLink to="/admin/" className="nav-link admin-link">
                                ⚙️ Admin
                            </NavLink>
                            <NavLink to="/admin/users" className="nav-link admin-link">
                                👥 Usuarios
                            </NavLink>
                            <NavLink to="/admin/products" className="nav-link admin-link">
                                📦 Productos
                            </NavLink>
                        </>
                    )}
                </div>
                
                {user && (
                    <div className="nav-user">
                        <span className="user-welcome">
                            ¡Hola, {user.name}! 
                            <span className="user-role">({user.role})</span>
                        </span>
                        <button 
                            className="logout-btn" 
                            onClick={handleLogout}
                            disabled={loading}
                        >
                            {loading ? '⏳' : '🚪'} Logout
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;