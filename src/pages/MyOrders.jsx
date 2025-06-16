import React, { useEffect, useState } from 'react';

const MyOrders = ({ userEmail }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/email/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,  // or use context if you store token elsewhere
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="border p-4 mb-4 rounded shadow">
            <h3 className="font-semibold mb-2">Order ID: {order.orderId}</h3>
            <ul className="list-disc list-inside mt-2">
            {order.items.map((item, index) => (
             <li key={index}>
              {item.productName} - Qty: {item.quantity} @ ₹{item.price}
             </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
