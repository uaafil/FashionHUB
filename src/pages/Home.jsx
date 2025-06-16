import React from 'react';
import Products from './Products';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Welcome to FashionHub 👗👕</h1>
      <p className="lead">Explore our top collections and latest trends.</p>
      <Products />
    </div>
  );
}

export default Home;
