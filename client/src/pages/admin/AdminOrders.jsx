import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaClipboardList, FaFilter } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';

const statuses = [
  'Placed','Confirmed','Baking',
  'Ready','Out for Delivery','Delivered','Cancelled'
];

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

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      toast.success(`Status updated to ${status}!`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status!');
    }
  };

  const filtered = filter === 'All'
    ? orders
    : orders.filter(o => o.status === filter);

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>

        {/* Header */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontWeight: '800', color: '#c2185b',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <FaClipboardList color="#e91e8c" /> Manage Orders
          </h2>
          <p style={{ color: '#888', margin: 0 }}>View and update all customer orders</p>
        </div>

        {/* Filter */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          marginBottom: '25px', alignItems: 'center'
        }}>
          <FaFilter color="#e91e8c" size={14} />
          {['All', ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 16px', borderRadius: '20px',
                border: '2px solid #e91e8c',
                background: filter === s
                  ? 'linear-gradient(135deg, #e91e8c, #c2185b)' : 'white',
                color: filter === s ? 'white' : '#e91e8c',
                fontWeight: '600', cursor: 'pointer',
                fontSize: '0.85rem', transition: 'all 0.3s'
              }}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '25px',
          boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner-border" style={{ color: '#e91e8c' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <GiCakeSlice size={50} color="#fce4ec" />
              <p style={{ color: '#888', marginTop: '15px' }}>No orders found!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr style={{ background: '#fce4ec' }}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Cake</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontSize: '0.75rem', color: '#888' }}>
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{order.user?.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.user?.email}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{order.cake?.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                          {order.customization?.flavor} | {order.customization?.size}
                        </div>
                        {order.customization?.message && (
                          <div style={{ fontSize: '0.75rem', color: '#e91e8c' }}>
                            "{order.customization.message}"
                          </div>
                        )}
                      </td>
                      <td style={{ color: '#e91e8c', fontWeight: '700' }}>
                        Rs. {order.totalPrice?.toLocaleString()}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: '#888' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span style={{
                          ...getStatusStyle(order.status),
                          padding: '4px 12px', borderRadius: '20px',
                          fontSize: '0.8rem', fontWeight: '600',
                          whiteSpace: 'nowrap'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          style={{
                            padding: '6px 10px', borderRadius: '8px',
                            border: '2px solid #fce4ec', fontSize: '0.85rem',
                            cursor: 'pointer', outline: 'none',
                            color: '#c2185b', fontWeight: '600'
                          }}>
                          {statuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;