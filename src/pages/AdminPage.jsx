import React from 'react';

const AdminPage = () => {
    return (
    <div style={{ padding: '2rem' }}>
        <h1>Panel de Administración</h1>
        <button style={{ marginBottom: '1rem' }}>Agregar Producto</button>
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>Producto A</td>
            <td>$100</td>
            <td>Electrónica</td>
            <td>
                <button>Editar</button>
                <button style={{ marginLeft: '0.5rem' }}>Eliminar</button>
            </td>
            </tr>
            <tr>
            <td>2</td>
            <td>Producto B</td>
            <td>$200</td>
            <td>Hogar</td>
            <td>
                <button>Editar</button>
                <button style={{ marginLeft: '0.5rem' }}>Eliminar</button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    );
};

export default AdminPage;