import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../crud/products/ProductForm';
import { scrollToTop } from '../utils/scrollToTop';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showAddButton, setShowAddButton] = useState(true);

    const [form, setForm] = useState({
        name: '',
        code: '',
        price: '',
        imgUrl: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });      
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/products', form)
        .then((res) => {
            alert('Producto agregado correctamente');
            setProducts([...products, res.data]);
            setForm({
                name: '',
                code: '',
                price: '',
                imgUrl: ''
            });
        })
        .catch((err) => console.error(err));
    }

    useEffect (() => {
        axios.get('http://localhost:3001/products')
        .then((res) => setProducts(res.data))
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/products/${id}`)
        .then(() => {
            setProducts(products.filter(product => product.id !== id));
            alert('Producto eliminado correctamente');
        })
        .catch((err) => console.error(err));
    }

    const handleEditButton = (id) => {
        setShowAddButton(false);
        axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
            setForm(res.data);
            scrollToTop();
        })
        .catch((err) => console.error(err));
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/products/${form.id}`, form)
        .then((res) => {
            setProducts(products.map(product => product.id === form.id ? res.data : product));
            alert('Producto editado correctamente');
            setForm({
                name: '',
                code: '',
                price: '',
                imgUrl: ''
            });
            
            setShowAddButton(true);
        })
        .catch((err) => console.error(err));
    }

    return (
    <div style={{ padding: '2rem' }}>
        <h1>Panel de Administración</h1>
        <ProductForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} showAddButton={showAddButton} handleEditSubmit={handleEditSubmit}/>

        <button onClick={()=>setShowAddButton(true)}>Agregar Productos</button>

        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Codigo</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.code}</td>
                    <td>
                        <button onClick={()=> {
                            handleEditButton(Number(product.id))   
                        } }>Editar</button>
                        <button onClick={()=>handleDelete(Number(product.id))}>Eliminar</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default Products;