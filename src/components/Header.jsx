import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../store/useUserStore";
import "./Header.css";

function Header() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Obtener datos del usuario y funciones del store de Zustand
    const { user, isAuthenticated, logout } = useUserStore();

    // ✅ Logout usando Zustand
    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout(); // Zustand se encarga de limpiar el estado y hacer la llamada al backend
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            navigate('/login'); // Redirigir de todas formas
        } finally {
            setLoading(false);
        }
    };

    const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

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
                    
                    {!isAuthenticated && (
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
                
                {isAuthenticated && user && (
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