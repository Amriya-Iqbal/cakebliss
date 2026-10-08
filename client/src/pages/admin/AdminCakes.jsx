import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';
import { MdCake } from 'react-icons/md';

const emptyForm = {
  name: '', description: '', category: 'Birthday',
  price: '', stock: '', flavors: '', sizes: '', image: null
};

const AdminCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCake, setEditCake] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchCakes(); }, []);

  const fetchCakes = async () => {
    try {
      const { data } = await API.get('/cakes');
      setCakes(data);
    } catch (err) {
      toast.error('Failed to load cakes!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (cake) => {
    setEditCake(cake);
    setFormData({
      name: cake.name, description: cake.description,
      category: cake.category, price: cake.price, stock: cake.stock,
      flavors: cake.flavors.join(', '),
      sizes: cake.sizes.join(', '), image: null
    });
    setImagePreview(cake.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cake?')) return;
    try {
      await API.delete(`/cakes/${id}`);
      toast.success('Cake deleted!');
      fetchCakes();
    } catch (err) {
      toast.error('Failed to delete!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('flavors', JSON.stringify(formData.flavors.split(',').map(f => f.trim())));
      data.append('sizes', JSON.stringify(formData.sizes.split(',').map(s => s.trim())));
      if (formData.image) data.append('image', formData.image);

      if (editCake) {
        await API.put(`/cakes/${editCake._id}`, data);
        toast.success('Cake updated!');
      } else {
        await API.post('/cakes', data);
        toast.success('Cake added!');
      }
      setShowForm(false);
      setEditCake(null);
      setFormData(emptyForm);
      setImagePreview('');
      fetchCakes();
    } catch (err) {
      toast.error('Failed to save cake!');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    borderRadius: '10px', border: '2px solid #fce4ec',
    padding: '10px 14px', width: '100%',
    fontSize: '0.9rem', outline: 'none'
  };

  const labelStyle = {
    fontWeight: '600', color: '#555', fontSize: '0.9rem',
    display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px'
  };

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '25px'
        }}>
          <div>
            <h2 style={{
              fontWeight: '800', color: '#c2185b',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <GiCakeSlice color="#e91e8c" size={28} /> Manage Cakes
            </h2>
            <p style={{ color: '#888', margin: 0 }}>Add, edit or delete cakes</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true); setEditCake(null);
              setFormData(emptyForm); setImagePreview('');
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
              color: 'white', border: 'none', borderRadius: '12px',
              padding: '12px 24px', fontWeight: '700', cursor: 'pointer'
            }}>
            <FaPlus size={14} /> Add New Cake
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{
            background: 'white', borderRadius: '20px', padding: '30px',
            marginBottom: '30px', boxShadow: '0 4px 20px rgba(233,30,140,0.15)'
          }}>
            <h5 style={{
              color: '#c2185b', fontWeight: '700', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {editCake ? <><FaEdit /> Edit Cake</> : <><FaPlus /> Add New Cake</>}
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* Image Upload */}
                <div className="col-12">
                  <label style={labelStyle}><FaImage color="#e91e8c" /> Cake Image</label>
                  <input
                    type="file" name="image" accept="image/*"
                    onChange={handleChange} style={inputStyle}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{
                      width: '150px', height: '150px', objectFit: 'cover',
                      borderRadius: '15px', marginTop: '10px',
                      border: '3px solid #fce4ec'
                    }} />
                  )}
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}><MdCake color="#e91e8c" /> Cake Name</label>
                  <input type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="e.g. Chocolate Truffle"
                    required style={inputStyle} />
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Category</label>
                  <select name="category" value={formData.category}
                    onChange={handleChange} style={inputStyle}>
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Custom</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Price (Rs.)</label>
                  <input type="number" name="price" value={formData.price}
                    onChange={handleChange} placeholder="e.g. 1500"
                    required style={inputStyle} />
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Stock</label>
                  <input type="number" name="stock" value={formData.stock}
                    onChange={handleChange} placeholder="e.g. 10"
                    required style={inputStyle} />
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Flavors <small style={{ color: '#aaa', fontWeight: '400' }}>(comma separated)</small></label>
                  <input type="text" name="flavors" value={formData.flavors}
                    onChange={handleChange}
                    placeholder="e.g. Chocolate, Vanilla, Strawberry"
                    required style={inputStyle} />
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Sizes <small style={{ color: '#aaa', fontWeight: '400' }}>(comma separated)</small></label>
                  <input type="text" name="sizes" value={formData.sizes}
                    onChange={handleChange} placeholder="e.g. 500g, 1kg, 2kg"
                    required style={inputStyle} />
                </div>

                <div className="col-12">
                  <label style={labelStyle}>Description</label>
                  <textarea name="description" value={formData.description}
                    onChange={handleChange} placeholder="Describe the cake..."
                    rows={3} style={{ ...inputStyle, resize: 'none' }} />
                </div>

                <div className="col-12" style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" disabled={saving} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                    color: 'white', border: 'none', borderRadius: '10px',
                    padding: '12px 28px', fontWeight: '700', cursor: 'pointer'
                  }}>
                    {saving ? 'Saving...' : editCake ? <><FaEdit /> Update Cake</> : <><FaPlus /> Add Cake</>}
                  </button>
                  <button type="button"
                    onClick={() => { setShowForm(false); setEditCake(null); }}
                    style={{
                      padding: '12px 28px', borderRadius: '10px',
                      border: '2px solid #e91e8c', background: 'white',
                      color: '#e91e8c', fontWeight: '600', cursor: 'pointer'
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Cakes Table */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '25px',
          boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner-border" style={{ color: '#e91e8c' }} />
            </div>
          ) : cakes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <GiCakeSlice size={50} color="#fce4ec" />
              <p style={{ color: '#888', marginTop: '15px' }}>
                No cakes yet. Click "Add New Cake"!
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr style={{ background: '#fce4ec' }}>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cakes.map((cake) => (
                    <tr key={cake._id}>
                      <td>
                        <img
                          src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100'}
                          alt={cake.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                      </td>
                      <td style={{ fontWeight: '600' }}>{cake.name}</td>
                      <td>
                        <span style={{
                          background: '#fce4ec', color: '#c2185b',
                          padding: '4px 12px', borderRadius: '20px',
                          fontSize: '0.8rem', fontWeight: '600'
                        }}>
                          {cake.category}
                        </span>
                      </td>
                      <td style={{ color: '#e91e8c', fontWeight: '700' }}>
                        Rs. {cake.price?.toLocaleString()}
                      </td>
                      <td style={{ color: cake.stock > 0 ? 'green' : 'red', fontWeight: '600' }}>
                        {cake.stock}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleEdit(cake)} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '7px 16px', borderRadius: '8px',
                            border: '2px solid #e91e8c', background: 'white',
                            color: '#e91e8c', fontWeight: '600', cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}>
                            <FaEdit size={12} /> Edit
                          </button>
                          <button onClick={() => handleDelete(cake._id)} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '7px 16px', borderRadius: '8px',
                            border: 'none', background: '#ff4444',
                            color: 'white', fontWeight: '600', cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}>
                            <FaTrash size={12} /> Delete
                          </button>
                        </div>
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

export default AdminCakes;