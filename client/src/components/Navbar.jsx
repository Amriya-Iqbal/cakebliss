import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { GiCakeSlice } from 'react-icons/gi';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaShoppingBag, FaInfoCircle, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
  };

  const linkStyle = {
    color: '#2d2d2d',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 2px 20px rgba(233,30,140,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px'
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontSize: '1.6rem', fontWeight: '800',
          color: '#e91e8c', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <GiCakeSlice size={30} color="#e91e8c" />
          CakeBliss
        </Link>

        {/* Center Links */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>
            <FaHome color="#e91e8c" /> Home
          </Link>
          <Link to="/shop" style={linkStyle}>
            <FaShoppingBag color="#e91e8c" /> Shop
          </Link>
          <Link to="/about" style={linkStyle}>
            <FaInfoCircle color="#e91e8c" /> About Us
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ ...linkStyle, color: '#e91e8c', fontWeight: '700' }}>
              <FaTachometerAlt color="#e91e8c" /> Admin Panel
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

          {/* Cart */}
          <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
            <FaShoppingCart size={22} color="#e91e8c" />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                background: '#e91e8c', color: 'white',
                borderRadius: '50%', width: '18px', height: '18px',
                fontSize: '0.65rem', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                  color: 'white', border: 'none',
                  borderRadius: '25px', padding: '10px 20px',
                  fontWeight: '600', cursor: 'pointer',
                  fontSize: '0.95rem', display: 'flex',
                  alignItems: 'center', gap: '8px'
                }}>
                <FaUser size={14} /> {user.name} ▾
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%',
                  background: 'white', borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  minWidth: '180px', overflow: 'hidden', zIndex: 1001
                }}>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 18px', color: '#2d2d2d',
                      textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500'
                    }}>
                    <FaUser color="#e91e8c" size={14} /> My Orders
                  </Link>
                  <hr style={{ margin: 0, borderColor: '#fce4ec' }} />
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      width: '100%', textAlign: 'left',
                      padding: '12px 18px', background: 'none', border: 'none',
                      color: '#ff4444', cursor: 'pointer',
                      fontSize: '0.9rem', fontWeight: '600'
                    }}>
                    <FaSignOutAlt color="#ff4444" size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" style={{
                color: '#e91e8c', border: '2px solid #e91e8c',
                borderRadius: '25px', padding: '8px 22px',
                textDecoration: 'none', fontWeight: '600',
                fontSize: '0.9rem', display: 'flex',
                alignItems: 'center', gap: '6px'
              }}>
                <FaUser size={13} /> Login
              </Link>
              <Link to="/register" style={{
                background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                color: 'white', borderRadius: '25px',
                padding: '8px 22px', textDecoration: 'none',
                fontWeight: '600', fontSize: '0.9rem'
              }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;