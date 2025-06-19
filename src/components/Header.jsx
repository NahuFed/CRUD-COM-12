import { NavLink, useNavigate } from "react-router-dom";

function Header () {
    
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';
  const navigate = useNavigate();
    return (
        <header className="bg-blue-500 text-white p-4">
        <nav>
        <h1 className="text-2xl font-bold">Mi tienda</h1>
            <NavLink to="/">Inicio </NavLink>
            <NavLink to="/login">Login </NavLink>

            {isAdmin && <NavLink to="/admin/">Admin  </NavLink>}
            {user && 
            <button id="logout-btn" onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
            }}>Logout</button>
        }
        </nav>
        </header>
    );
}

export default Header;