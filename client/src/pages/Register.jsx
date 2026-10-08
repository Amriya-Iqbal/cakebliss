import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { GiCakeSlice } from 'react-icons/gi';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    confirmPassword: '', phone: '', address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', {
        name: formData.name, email: formData.email,
        password: formData.password, phone: formData.phone,
        address: formData.address
      });
      login(data, data.token);
      toast.success(`Welcome to CakeBliss, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderRadius: '12px', padding: '12px 15px',
    border: '2px solid #fce4ec', fontSize: '0.95rem',
    width: '100%', outline: 'none', marginTop: '6px'
  };

  const labelStyle = {
    fontWeight: '600', color: '#555', fontSize: '0.9rem',
    display: 'flex', alignItems: 'center', gap: '6px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '30px 20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '30px',
        padding: '50px 40px', width: '100%', maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(233,30,140,0.2)'
      }}>
        <div className="text-center mb-4">
          <GiCakeSlice size={50} color="#e91e8c" />
          <h2 style={{ color: '#e91e8c', fontWeight: '800', fontSize: '2rem', marginTop: '10px' }}>
            CakeBliss
          </h2>
          <h4 style={{ color: '#c2185b', fontWeight: '700' }}>Create Account</h4>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Join us and order delicious cakes!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={labelStyle}><FaUser color="#e91e8c" /> Full Name</label>
            <input type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Enter your full name"
              required style={inputStyle} />
          </div>

          <div className="mb-3">
            <label style={labelStyle}><FaEnvelope color="#e91e8c" /> Email Address</label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Enter your email"
              required style={inputStyle} />
          </div>

          <div className="mb-3">
            <label style={labelStyle}><FaPhone color="#e91e8c" /> Phone Number</label>
            <input type="text" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="Enter your phone number"
              style={inputStyle} />
          </div>

          <div className="mb-3">
            <label style={labelStyle}><FaMapMarkerAlt color="#e91e8c" /> Address</label>
            <textarea name="address" value={formData.address}
              onChange={handleChange} placeholder="Enter your delivery address"
              rows={2} style={{ ...inputStyle, resize: 'none' }} />
          </div>

          <div className="mb-3">
            <label style={labelStyle}><FaLock color="#e91e8c" /> Password</label>
            <input type="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="Create a password"
              required style={inputStyle} />
          </div>

          <div className="mb-4">
            <label style={labelStyle}><FaLock color="#e91e8c" /> Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword}
              onChange={handleChange} placeholder="Confirm your password"
              required style={inputStyle} />
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontWeight: '700', fontSize: '1rem', cursor: 'pointer'
            }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ color: '#888', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e91e8c', fontWeight: '700', textDecoration: 'none' }}>
            Login Here
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

export default Register;