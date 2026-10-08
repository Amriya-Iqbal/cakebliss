import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaUsers, FaSearch, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get('/admin/customers');
      setCustomers(data);
    } catch (err) {
      toast.error('Failed to load customers!');
    } finally {
      setLoading(false);
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>

        {/* Header */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontWeight: '800', color: '#c2185b',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <FaUsers color="#e91e8c" size={26} /> Customers
          </h2>
          <p style={{ color: '#888', margin: 0 }}>
            {customers.length} registered customers
          </p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '400px', marginBottom: '25px', position: 'relative' }}>
          <FaSearch style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)', color: '#e91e8c'
          }} />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '10px 16px 10px 40px',
              borderRadius: '25px', border: '2px solid #fce4ec',
              outline: 'none', fontSize: '0.9rem'
            }}
          />
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
              <p style={{ color: '#888', marginTop: '15px' }}>No customers found!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr style={{ background: '#fce4ec' }}>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((customer) => (
                    <tr key={customer._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                            color: 'white', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '1rem', flexShrink: 0
                          }}>
                            {customer.name?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ fontWeight: '600' }}>{customer.name}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.9rem' }}>
                          <FaEnvelope color="#e91e8c" size={12} /> {customer.email}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.9rem' }}>
                          <FaPhone color="#e91e8c" size={12} /> {customer.phone || '—'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.9rem' }}>
                          <FaMapMarkerAlt color="#e91e8c" size={12} /> {customer.address || '—'}
                        </div>
                      </td>
                      <td style={{ color: '#888', fontSize: '0.85rem' }}>
                        {new Date(customer.createdAt).toLocaleDateString()}
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

export default AdminCustomers;