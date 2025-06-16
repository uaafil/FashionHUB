import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/OrderService';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalPrice
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCODOrder = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      await placeOrder(cartItems, user.email, 'COD');
      alert("Order placed successfully with Cash on Delivery!");
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error("Order placing failed:", error);
      alert("Failed to place order: " + (error.response?.data || error.message));
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_YNYiU5c782pQBh", // Replace with your Razorpay Test Key
      currency: "INR",
      amount: totalPrice * 100,
      name: "FashionHub",
      description: "E-commerce Order",
      handler: async function (response) {
        try {
          await placeOrder(cartItems, user.email, 'ONLINE');
          alert("Payment successful and order placed!");
          clearCart();
          navigate('/orders');
        } catch (err) {
          console.error("Payment succeeded but order failed:", err);
          alert("Payment successful but failed to place order.");
        }
      },
      prefill: {
        email: user.email,
        name: user.email.split('@')[0]
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mt-5">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <Link to="/products">Continue shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map(item => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                  <img
                    src={
                     item.imageUrl
                       ? `http://localhost:8080${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`
                       : 'https://via.placeholder.com/200x200'
                    }
                    className="img-fluid rounded-start"
                    alt={item.name}
                    style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                  />

                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">₹{item.price}</p>
                      {item.size && (
                        <p className="card-text">Size: {item.size}</p>
                      )}
                      <div className="d-flex align-items-center mt-3">
                        <label className="me-2">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="form-control me-3"
                          style={{ width: '70px' }}
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-outline-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleRazorpayPayment}
                  className="btn btn-primary w-100 mb-2"
                  disabled={cartItems.length === 0}
                >
                  Pay Online (Razorpay)
                </button>

                <button
                  onClick={handleCODOrder}
                  className="btn btn-outline-success w-100 mb-2"
                  disabled={cartItems.length === 0}
                >
                  Cash on Delivery (COD)
                </button>

                <Link to="/products" className="btn btn-secondary w-100">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
