import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GiCakeSlice } from 'react-icons/gi';
import { MdDashboard, MdPeople } from 'react-icons/md';
import { FaClipboardList, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import { RiCakeLine } from 'react-icons/ri';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { to: '/admin',           label: 'Dashboard',     icon: <MdDashboard size={18} /> },
    { to: '/admin/cakes',     label: 'Manage Cakes',  icon: <RiCakeLine size={18} /> },
    { to: '/admin/orders',    label: 'Manage Orders', icon: <FaClipboardList size={16} /> },
    { to: '/admin/customers', label: 'Customers',     icon: <MdPeople size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #c2185b, #e91e8c)',
        minHeight: '100vh', position: 'fixed',
        top: 0, left: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column'
      }}>

        {/* Logo */}
        <div style={{
          padding: '25px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <GiCakeSlice size={28} color="white" />
          <div>
            <h4 style={{ color: 'white', fontWeight: '800', margin: 0 }}>CakeBliss</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>
              Admin Panel
            </p>
          </div>
        </div>

        {/* Admin Info */}
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', color: 'white', fontSize: '1.1rem',
            marginBottom: '8px'
          }}>
            {user?.name?.[0]}
          </div>
          <p style={{ color: 'white', fontWeight: '600', margin: 0, fontSize: '0.9rem' }}>
            {user?.name}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.75rem' }}>
            Administrator
          </p>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, paddingTop: '10px' }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 25px',
                color: location.pathname === link.to
                  ? 'white' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontWeight: location.pathname === link.to ? '700' : '500',
                background: location.pathname === link.to
                  ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderLeft: location.pathname === link.to
                  ? '4px solid white' : '4px solid transparent',
                transition: 'all 0.3s', fontSize: '0.95rem'
              }}>
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Buttons */}
        <div style={{ padding: '20px' }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
            fontSize: '0.85rem', marginBottom: '10px',
            padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.1)'
          }}>
            <FaGlobe size={14} /> View Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '10px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '10px', color: 'white',
              fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px'
            }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', flex: 1, background: '#fff5f7' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;