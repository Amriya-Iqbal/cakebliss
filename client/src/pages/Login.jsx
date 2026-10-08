import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { GiCakeSlice } from 'react-icons/gi';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', formData);
      login(data, data.token);
      toast.success(`Welcome back, ${data.name}!`);
      if (data.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderRadius: '12px', padding: '12px 15px',
    border: '2px solid #fce4ec', fontSize: '0.95rem',
    width: '100%', outline: 'none', marginTop: '6px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '30px',
        padding: '50px 40px', width: '100%', maxWidth: '450px',
        boxShadow: '0 20px 60px rgba(233,30,140,0.2)'
      }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <GiCakeSlice size={50} color="#e91e8c" />
          <h2 style={{ color: '#e91e8c', fontWeight: '800', fontSize: '2rem', marginTop: '10px' }}>
            CakeBliss
          </h2>
          <h4 style={{ color: '#c2185b', fontWeight: '700' }}>Welcome Back!</h4>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Login to order your favorite cakes</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={{ fontWeight: '600', color: '#555', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaEnvelope color="#e91e8c" /> Email Address
            </label>
            <input
              type="email" name="email"
              value={formData.email} onChange={handleChange}
              placeholder="Enter your email"
              required style={inputStyle}
            />
          </div>

          <div className="mb-4">
            <label style={{ fontWeight: '600', color: '#555', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaLock color="#e91e8c" /> Password
            </label>
            <input
              type="password" name="password"
              value={formData.password} onChange={handleChange}
              placeholder="Enter your password"
              required style={inputStyle}
            />
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px'
            }}>
            <FaSignInAlt /> {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ color: '#888', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#e91e8c', fontWeight: '700', textDecoration: 'none' }}>
            Sign Up Here
          </Link>
        </p>
        <div className="text-center mt-2">
          <Link to="/" style={{ color: '#bbb', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;