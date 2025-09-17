import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header () {
    
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';
  const navigate = useNavigate();
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
                            onClick={() => {
                                localStorage.removeItem('user');
                                navigate('/login');
                            }}
                        >
                            🚪 Logout
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;