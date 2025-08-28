import { useEffect, useState } from "react";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../helpers/queriesProductos";
import ProductForm from "../crud/products/ProductForm";
import { scrollToTop } from "../utils/scrollToTop";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true);

  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(form);
      alert("Producto agregado correctamente");
      setProducts([...products, newProduct]);
      setForm({
        name: "",
        code: "",
        price: "",
        imgUrl: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al agregar el producto");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      alert("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el producto");
    }
  };

  const handleEditButton = async (id) => {
    setShowAddButton(false);
    try {
      const product = await getProductById(id);
      setForm(product);
      scrollToTop();
    } catch (err) {
      console.error(err);
      alert("Error al cargar el producto para editar");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(form.id, form);
      setProducts(
        products.map((product) =>
          product.id === form.id ? updatedProduct : product
        )
      );
      alert("Producto editado correctamente");
      setForm({
        name: "",
        code: "",
        price: "",
        imgUrl: "",
      });

      setShowAddButton(true);
    } catch (err) {
      console.error(err);
      alert("Error al editar el producto");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Panel de Administración</h1>
      <ProductForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showAddButton={showAddButton}
        handleEditSubmit={handleEditSubmit}
      />

      <button
        onClick={() => {
          setShowAddButton(true);
          setForm({
            name: "",
            code: "",
            price: "",
            imgUrl: "",
          });
          scrollToTop();
        }}
      >
        Agregar Productos
      </button>

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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.code}</td>
              <td>
                <button
                  onClick={() => {
                    handleEditButton(Number(product.id));
                  }}
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(Number(product.id))}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
