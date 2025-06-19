import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import "./App.css";
import Products from "./pages/Products";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <></>
          <Route path="/admin" element={
            <ProtectedRoute role={"admin"}>
                <AdminPage />
            </ProtectedRoute>
          }>        
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />    
          </Route>

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
