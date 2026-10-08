import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const CakeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchCake();
  }, [id]);

  const fetchCake = async () => {
    try {
      const { data } = await API.get(`/cakes/${id}`);
      setCake(data);
      setSelectedFlavor(data.flavors?.[0] || '');
      setSelectedSize(data.sizes?.[0] || '');
    } catch (err) {
      toast.error('Cake not found!');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedFlavor) { toast.error('Please select a flavor!'); return; }
    if (!selectedSize)   { toast.error('Please select a size!');   return; }
    addToCart({
      ...cake,
      selectedFlavor,
      selectedSize,
      message,
      quantity
    });
    toast.success(`${cake.name} added to cart! 🛒`);
  };

  const handleOrderNow = () => {
    if (!selectedFlavor) { toast.error('Please select a flavor!'); return; }
    if (!selectedSize)   { toast.error('Please select a size!');   return; }
    addToCart({ ...cake, selectedFlavor, selectedSize, message, quantity });
    navigate('/cart');
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: '#e91e8c' }} />
        <p className="mt-3" style={{ color: '#e91e8c' }}>Loading cake...</p>
      </div>
    </div>
  );

  if (!cake) return null;

  return (
    <div>
      <Navbar />

      <div className="container py-5">

        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          style={{
            background: 'none', border: 'none',
            color: '#e91e8c', fontWeight: '600',
            fontSize: '1rem', cursor: 'pointer',
            marginBottom: '20px'
          }}>
          ← Back to Shop
        </button>

        <div className="row g-5">

          {/* Left - Image */}
          <div className="col-lg-6">
            <img
              src={cake.image ||
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600'}
              alt={cake.name}
              style={{
                width: '100%',
                height: '480px',
                objectFit: 'cover',
                borderRadius: '25px',
                boxShadow: '0 20px 50px rgba(233,30,140,0.2)'
              }}
            />
          </div>

          {/* Right - Details */}
          <div className="col-lg-6">

            {/* Category & Name */}
            <span className="badge-pink mb-3 d-inline-block">
              {cake.category}
            </span>
            <h1 style={{ fontWeight: '800', color: '#2d2d2d', fontSize: '2.2rem' }}>
              {cake.name}
            </h1>
            <p style={{ color: '#888', fontSize: '1rem', marginTop: '10px' }}>
              {cake.description}
            </p>

            {/* Price */}
            <div style={{
              fontSize: '2rem', fontWeight: '800',
              color: '#e91e8c', margin: '15px 0'
            }}>
              Rs. {cake.price?.toLocaleString()}
            </div>

            {/* Stock */}
            <p style={{ color: cake.stock > 0 ? 'green' : 'red', fontWeight: '600' }}>
              {cake.stock > 0 ? ` In Stock (${cake.stock} available)` : '❌ Out of Stock'}
            </p>

            <hr style={{ borderColor: '#fce4ec' }} />

            {/* Flavor Selection */}
            {cake.flavors?.length > 0 && (
              <div className="mb-4">
                <label style={{ fontWeight: '700', color: '#555', marginBottom: '10px', display: 'block' }}>
                   Select Flavor
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {cake.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: '2px solid #e91e8c',
                        background: selectedFlavor === flavor
                          ? 'linear-gradient(135deg, #e91e8c, #c2185b)'
                          : 'white',
                        color: selectedFlavor === flavor ? 'white' : '#e91e8c',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}>
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {cake.sizes?.length > 0 && (
              <div className="mb-4">
                <label style={{ fontWeight: '700', color: '#555', marginBottom: '10px', display: 'block' }}>
                   Select Size
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {cake.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: '2px solid #e91e8c',
                        background: selectedSize === size
                          ? 'linear-gradient(135deg, #e91e8c, #c2185b)'
                          : 'white',
                        color: selectedSize === size ? 'white' : '#e91e8c',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Message */}
            <div className="mb-4">
              <label style={{ fontWeight: '700', color: '#555', marginBottom: '8px', display: 'block' }}>
                 Message on Cake (Optional)
              </label>
              <input
                type="text"
                className="form-control input-pink"
                placeholder="e.g. Happy Birthday Sarah! "
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={50}
                style={{
                  borderRadius: '12px',
                  padding: '12px 15px',
                  border: '2px solid #fce4ec'
                }}
              />
              <small style={{ color: '#bbb' }}>{message.length}/50 characters</small>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label style={{ fontWeight: '700', color: '#555', marginBottom: '8px', display: 'block' }}>
                 Quantity
              </label>
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    border: '2px solid #e91e8c',
                    background: 'white', color: '#e91e8c',
                    fontWeight: '800', fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}>
                  −
                </button>
                <span style={{ fontSize: '1.3rem', fontWeight: '700', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(cake.stock, q + 1))}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    border: '2px solid #e91e8c',
                    background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                    color: 'white',
                    fontWeight: '800', fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}>
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div style={{
              background: '#fce4ec',
              borderRadius: '15px',
              padding: '15px 20px',
              marginBottom: '20px'
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: '600', color: '#555' }}>Total Price:</span>
                <span style={{ fontWeight: '800', color: '#e91e8c', fontSize: '1.5rem' }}>
                  Rs. {(cake.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={cake.stock === 0}
                className="btn btn-outline-pink flex-grow-1"
                style={{ padding: '13px', borderRadius: '12px', fontWeight: '700' }}>
                Add to Cart 
              </button>
              <button
                onClick={handleOrderNow}
                disabled={cake.stock === 0}
                className="btn btn-pink flex-grow-1"
                style={{ padding: '13px', borderRadius: '12px', fontWeight: '700' }}>
                Order Now 
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a', color: 'white',
        padding: '20px 0', marginTop: '40px'
      }}>
        <p className="text-center mb-0" style={{ color: '#666', fontSize: '0.85rem' }}>
          © 2026 CakeBliss. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default CakeDetail;