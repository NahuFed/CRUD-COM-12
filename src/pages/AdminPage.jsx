import { NavLink, Outlet } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <>
    <nav id="admin-nav">
      <NavLink to="/admin/products" className="nav-link">
        Products
      </NavLink>
      <NavLink to="/admin/users" className="nav-link">
        Users
      </NavLink>
    </nav>
    <Outlet />
    </>
  );
};

export default AdminPage;
