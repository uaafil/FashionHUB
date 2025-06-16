import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const fetchProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get('http://localhost:8080/api/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:8080/api/products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product added successfully!');
      setFormData({ name: '', description: '', price: '', image: null });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin - Manage Products</h2>
      <form onSubmit={handleAddProduct} className="mb-4">
        <div className="mb-2">
          <input type="text" name="name" placeholder="Name" className="form-control" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="mb-2">
          <input type="text" name="description" placeholder="Description" className="form-control" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="mb-2">
          <input type="number" name="price" placeholder="Price" className="form-control" value={formData.price} onChange={handleInputChange} required />
        </div>
        <div className="mb-2">
          <input type="file" name="image" className="form-control" onChange={handleInputChange} required />
        </div>
        <button className="btn btn-success">Add Product</button>
      </form>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Description</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td><button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
