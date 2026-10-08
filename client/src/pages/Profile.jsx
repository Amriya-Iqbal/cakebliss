import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';
import { GiCakeSlice } from 'react-icons/gi';

const statusSteps = ['Placed','Confirmed','Baking','Ready','Out for Delivery','Delivered'];

const getStatusStyle = (status) => {
  const styles = {
    'Placed':           { background: '#fff3cd', color: '#856404' },
    'Confirmed':        { background: '#cce5ff', color: '#004085' },
    'Baking':           { background: '#f8d7da', color: '#721c24' },
    'Ready':            { background: '#d4edda', color: '#155724' },
    'Out for Delivery': { background: '#d1ecf1', color: '#0c5460' },
    'Delivered':        { background: '#d4edda', color: '#155724' },
    'Cancelled':        { background: '#f5c6cb', color: '#721c24' },
  };
  return styles[status] || {};
};

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my');
      setOrders(data.reverse());
    } catch (err) {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  const tabBtn = (tab, label, icon) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: '10px 24px', borderRadius: '25px',
        border: '2px solid #e91e8c',
        background: activeTab === tab
          ? 'linear-gradient(135deg, #e91e8c, #c2185b)' : 'white',
        color: activeTab === tab ? 'white' : '#e91e8c',
        fontWeight: '600', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '6px'
      }}>
      {icon} {label}
    </button>
  );

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
        padding: '50px 0', color: 'white'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', fontWeight: 'bold'
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontWeight: '800', margin: 0 }}>{user?.name}</h3>
              <p style={{ opacity: 0.9, margin: 0, fontSize: '0.9rem' }}>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          {tabBtn('orders', 'My Orders', <GiCakeSlice size={16} />)}
          {tabBtn('info', 'My Info', <FaUser size={14} />)}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div className="spinner-border" style={{ color: '#e91e8c' }} />
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <GiCakeSlice size={60} color="#fce4ec" />
                <h4 style={{ color: '#c2185b', marginTop: '15px' }}>No orders yet!</h4>
                <p style={{ color: '#888' }}>Start ordering your favorite cakes</p>
                <Link to="/shop" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                  color: 'white', borderRadius: '25px', padding: '12px 30px',
                  textDecoration: 'none', fontWeight: '700', marginTop: '15px'
                }}>
                  <MdCake size={18} /> Browse Cakes
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => {
                  const stepIndex = statusSteps.indexOf(order.status);
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <div key={order._id} style={{
                      background: 'white', borderRadius: '20px', padding: '25px',
                      boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
                    }}>
                      {/* Order Header */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', flexWrap: 'wrap',
                        gap: '15px', marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <img
                            src={order.cake?.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100'}
                            alt={order.cake?.name}
                            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '15px' }}
                          />
                          <div>
                            <h5 style={{ fontWeight: '700', margin: 0 }}>{order.cake?.name}</h5>
                            <p style={{ color: '#888', fontSize: '0.85rem', margin: '3px 0' }}>
                              {order.customization?.flavor} | {order.customization?.size} | Qty: {order.quantity}
                            </p>
                            {order.customization?.message && (
                              <p style={{ color: '#e91e8c', fontSize: '0.8rem', margin: 0 }}>
                                "{order.customization.message}"
                              </p>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            ...getStatusStyle(order.status),
                            padding: '5px 14px', borderRadius: '20px',
                            fontSize: '0.8rem', fontWeight: '700'
                          }}>
                            {order.status}
                          </span>
                          <p style={{ color: '#e91e8c', fontWeight: '800', fontSize: '1.2rem', margin: '8px 0 0' }}>
                            Rs. {order.totalPrice?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Status Tracker */}
                      {!isCancelled && (
                        <div style={{ margin: '20px 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                            <div style={{
                              position: 'absolute', top: '15px', left: 0, right: 0,
                              height: '3px', background: '#fce4ec', zIndex: 0
                            }} />
                            <div style={{
                              position: 'absolute', top: '15px', left: 0,
                              width: `${(stepIndex / (statusSteps.length - 1)) * 100}%`,
                              height: '3px',
                              background: 'linear-gradient(90deg, #e91e8c, #c2185b)',
                              zIndex: 1, transition: 'width 0.5s'
                            }} />
                            {statusSteps.map((step, i) => (
                              <div key={step} style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: 1 }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: i <= stepIndex
                                    ? 'linear-gradient(135deg, #e91e8c, #c2185b)' : '#fce4ec',
                                  color: i <= stepIndex ? 'white' : '#e91e8c',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  margin: '0 auto', fontWeight: 'bold', fontSize: '0.8rem'
                                }}>
                                  {i <= stepIndex ? <FaCheckCircle size={14} /> : i + 1}
                                </div>
                                <p style={{
                                  fontSize: '0.65rem', marginTop: '6px',
                                  color: i <= stepIndex ? '#c2185b' : '#bbb',
                                  fontWeight: i === stepIndex ? '700' : '500'
                                }}>
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isCancelled && (
                        <div style={{
                          background: '#f5c6cb', color: '#721c24',
                          padding: '10px 15px', borderRadius: '10px',
                          textAlign: 'center', fontWeight: '600'
                        }}>
                          This order was cancelled
                        </div>
                      )}

                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: '10px', marginTop: '15px',
                        paddingTop: '15px', borderTop: '1px solid #fce4ec',
                        fontSize: '0.85rem', color: '#888'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaMapMarkerAlt color="#e91e8c" size={12} /> {order.deliveryAddress}
                        </span>
                        <span>
                          Delivery: {order.deliveryDate
                            ? new Date(order.deliveryDate).toLocaleDateString() : 'Not set'}
                        </span>
                        <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div style={{
            background: 'white', borderRadius: '20px', padding: '30px',
            boxShadow: '0 4px 15px rgba(233,30,140,0.1)', maxWidth: '500px'
          }}>
            <h5 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '25px' }}>
              Account Information
            </h5>
            {[
              { icon: <FaUser color="#e91e8c" />,          label: 'Full Name', value: user?.name },
              { icon: <FaEnvelope color="#e91e8c" />,      label: 'Email',     value: user?.email },
              { icon: <FaPhone color="#e91e8c" />,         label: 'Phone',     value: user?.phone || '—' },
              { icon: <FaMapMarkerAlt color="#e91e8c" />,  label: 'Address',   value: user?.address || '—' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <label style={{
                  fontWeight: '600', color: '#888', fontSize: '0.85rem',
                  display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px'
                }}>
                  {item.icon} {item.label}
                </label>
                <p style={{ fontWeight: '600', fontSize: '1rem', margin: 0, paddingLeft: '20px' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;