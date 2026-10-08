import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api/axios';
import { FaShoppingBag, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';
import { GiCakeSlice } from 'react-icons/gi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0, totalCakes: 0,
    totalCustomers: 0, totalRevenue: 0, pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, cakesRes, customersRes] = await Promise.all([
        API.get('/orders'),
        API.get('/cakes'),
        API.get('/admin/customers'),
      ]);
      const orders = ordersRes.data;
      const revenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + o.totalPrice, 0);
      const pending = orders.filter(o => o.status === 'Placed').length;

      setStats({
        totalOrders: orders.length,
        totalCakes: cakesRes.data.length,
        totalCustomers: customersRes.data.length,
        totalRevenue: revenue,
        pendingOrders: pending,
      });
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Orders',   value: stats.totalOrders,                          icon: <FaShoppingBag size={28} />,    color: '#e91e8c' },
    { label: 'Total Revenue',  value: `Rs. ${stats.totalRevenue.toLocaleString()}`, icon: <FaMoneyBillWave size={28} />, color: '#c2185b' },
    { label: 'Total Cakes',    value: stats.totalCakes,                            icon: <GiCakeSlice size={28} />,      color: '#e91e8c' },
    { label: 'Customers',      value: stats.totalCustomers,                        icon: <FaUsers size={28} />,          color: '#c2185b' },
    { label: 'Pending Orders', value: stats.pendingOrders,                         icon: <FaClock size={28} />,          color: '#e91e8c' },
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

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>

        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontWeight: '800', color: '#c2185b',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <MdCake size={30} color="#e91e8c" /> Dashboard
          </h2>
          <p style={{ color: '#888', margin: 0 }}>
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner-border" style={{ color: '#e91e8c' }} />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="row g-3 mb-4">
              {statCards.map((card, i) => (
                <div key={i} className="col-sm-6 col-lg-4">
                  <div style={{
                    background: 'white', borderRadius: '20px', padding: '25px',
                    boxShadow: '0 4px 15px rgba(233,30,140,0.1)',
                    borderLeft: `5px solid ${card.color}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>{card.label}</p>
                      <h3 style={{ fontWeight: '800', color: card.color, margin: '5px 0 0' }}>
                        {card.value}
                      </h3>
                    </div>
                    <div style={{
                      color: card.color, background: '#fce4ec',
                      padding: '12px', borderRadius: '15px'
                    }}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{
              background: 'white', borderRadius: '20px', padding: '25px',
              boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
            }}>
              <h5 style={{
                fontWeight: '700', color: '#c2185b', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <FaShoppingBag color="#e91e8c" /> Recent Orders
              </h5>

              {recentOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                  <GiCakeSlice size={40} color="#fce4ec" />
                  <p style={{ marginTop: '10px' }}>No orders yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr style={{ background: '#fce4ec' }}>
                        <th>Customer</th>
                        <th>Cake</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td style={{ fontWeight: '600' }}>{order.user?.name}</td>
                          <td>{order.cake?.name}</td>
                          <td style={{ color: '#e91e8c', fontWeight: '700' }}>
                            Rs. {order.totalPrice?.toLocaleString()}
                          </td>
                          <td style={{ color: '#888', fontSize: '0.85rem' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <span style={{
                              ...getStatusStyle(order.status),
                              padding: '4px 12px', borderRadius: '20px',
                              fontSize: '0.8rem', fontWeight: '600'
                            }}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;