import React from 'react';
import './ProductCard.css'; 
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductCard = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
        .then((res)=>setProducts(res.data))
    }, []);

    
    return (

        products.map(product => (
            <div className='card' key={product.id}>
                <img src={product.imgUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Codigo: {product.code}</p>
                <p>Precio: ${product.price}</p>
            </div>
        ))


    );
};

export default ProductCard;