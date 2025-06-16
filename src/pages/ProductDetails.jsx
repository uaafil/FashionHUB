import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Import the cart hook

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');  // Track selected size
  const { addToCart } = useCart();  // Get the addToCart function from the hook

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">Product not found.</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/500x500'} 
            className="img-fluid rounded" 
            alt={product.name} 
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">₹{product.price}</p>
          <p>{product.description}</p>

          {/* Size Selector */}
          <div className="mb-3">
            <label className="form-label">Size:</label>
            <select 
              className="form-select" 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button 
            className="btn btn-primary"
            onClick={() => addToCart({ ...product, size: selectedSize }, 1)}
          >
            Add to Cart
          </button>

          <Link to="/products" className="btn btn-link">Back to Products</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;