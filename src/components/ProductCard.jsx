import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300); // Slight delay for smoother load
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="col-12 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={
            product.imageUrl
              ? `http://localhost:8080${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`
              : 'https://via.placeholder.com/300x250'
          }
          className="card-img-top"
          alt={product.name}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <p className="card-text fw-bold">₹{product.price}</p>
          <div className="mt-auto d-flex gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="btn btn-primary w-50"
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="btn btn-outline-secondary w-50">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
