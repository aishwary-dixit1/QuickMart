import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, HouseIcon } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out!');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">QuickMart</Link>

      <div className="nav-links">
        {(currentPath.startsWith("/cart") || currentPath.startsWith("/products/")) && <Link to="/" className="home-link">
          <HouseIcon size={25}/>
        </Link>}
        {(currentPath === "/" || currentPath.startsWith("/products/")) && <Link to="/cart" className="cart-link">
          <ShoppingCart size={25}/>
          <span>{cartCount}</span>
        </Link>}
        
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={25} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
