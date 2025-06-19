import UserFormModal from "../crud/users/UserFormModal";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(`http://localhost:3001/users/${form.id}`, form)
        .then((res) => {
          setUsers(
            users.map((user) => (user.id === form.id ? res.data : user))
          );
          setOpenModal(false);
          alert("Usuario actualizado correctamente");
        })
        .catch((err) => console.error("Error updating user:", err));
    } else {
      axios
        .post("http://localhost:3001/users", form)
        .then((res) => {
          setUsers([...users, res.data]);
          setOpenModal(false);
          alert("Usuario agregado correctamente");
        })
        .catch((err) => console.error("Error adding user:", err));
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditUser = (user) => {
    setIsEdit(true);
    setForm(user);
    handleOpenModal();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      axios
        .delete(`http://localhost:3001/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          alert("Usuario eliminado correctamente");
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsEdit(false);
          setForm({
            name: "",
            email: "",
            role: "",
            password: "",
          });
          handleOpenModal();
        }}
      >
        Crear
      </Button>
      <UserFormModal
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        open={openModal}        
        onClose={handleCloseModal}
      />

      <h1>Usuarios</h1>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo Electronico</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditUser(user)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default Users;
