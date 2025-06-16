import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-100 bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <Link className="navbar-brand text-white" to="/">FashionHub</Link>

      <div className="d-flex gap-3 align-items-center">
        <Link className="text-white text-decoration-none" to="/products">Products</Link>

        {user && (
          <Link className="text-white text-decoration-none" to="/cart">Cart</Link>
        )}

        {user?.roles?.includes('ADMIN') && (
          <Link className="text-white text-decoration-none" to="/admin/products">Admin</Link>
        )}

        {user && (
          <>
            <Link className="text-white text-decoration-none" to="/orders">My Orders</Link>
            {user.roles.includes('ADMIN') && (
              <Link className="text-white text-decoration-none" to="/admin/orders">Admin Orders</Link>
            )}
          </>
        )}

        {user ? (
          <>
            <span>Hello, {user.email}</span>
            <button onClick={logout} className="btn btn-link text-white text-decoration-none">Logout</button>
          </>
        ) : (
          <>
            <Link className="text-white text-decoration-none" to="/login">Login</Link>
            <Link className="text-white text-decoration-none" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
