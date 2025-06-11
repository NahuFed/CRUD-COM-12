import { Link } from "react-router-dom";

function Header () {
    return (
        <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Mi tienda</h1>
        <nav>
            <Link to="/">Inicio </Link>
            <Link to="/login">Login </Link>
            <Link to="/admin">Admin </Link>
        </nav>
        </header>
    );
}

export default Header;