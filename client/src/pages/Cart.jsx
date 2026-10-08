import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaTrash, FaArrowRight } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';

const Cart = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <h2 style={{
          fontWeight: '800', color: '#c2185b', marginBottom: '30px',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <FaShoppingCart color="#e91e8c" /> My Cart
        </h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <FaShoppingCart size={70} color="#fce4ec" />
            <h4 style={{ color: '#c2185b', marginTop: '20px' }}>Your cart is empty!</h4>
            <p style={{ color: '#888' }}>Add some delicious cakes to get started</p>
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
          <div className="row g-4">
            <div className="col-lg-8">
              {cart.map((item, index) => (
                <div key={index} style={{
                  background: 'white', borderRadius: '20px',
                  padding: '20px', marginBottom: '15px',
                  boxShadow: '0 4px 15px rgba(233,30,140,0.1)',
                  display: 'flex', gap: '20px', alignItems: 'center'
                }}>
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200'}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '15px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontWeight: '700', margin: 0 }}>{item.name}</h5>
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0' }}>
                      {item.selectedFlavor} | {item.selectedSize}
                    </p>
                    {item.message && (
                      <p style={{ color: '#e91e8c', fontSize: '0.8rem', margin: '3px 0' }}>
                        "{item.message}"
                      </p>
                    )}
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#e91e8c', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>
                      Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      style={{
                        background: 'none', border: 'none',
                        color: '#ff4444', cursor: 'pointer',
                        marginTop: '8px', display: 'flex',
                        alignItems: 'center', gap: '5px',
                        fontSize: '0.85rem', fontWeight: '600'
                      }}>
                      <FaTrash size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div style={{
                background: 'white', borderRadius: '20px', padding: '25px',
                boxShadow: '0 4px 15px rgba(233,30,140,0.1)',
                position: 'sticky', top: '20px'
              }}>
                <h5 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '20px' }}>
                  Order Summary
                </h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#888' }}>Items ({cart.length})</span>
                  <span style={{ fontWeight: '600' }}>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#888' }}>Delivery</span>
                  <span style={{ color: 'green', fontWeight: '600' }}>Free</span>
                </div>
                <hr style={{ borderColor: '#fce4ec' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                  <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#e91e8c' }}>
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  style={{
                    width: '100%', padding: '13px',
                    background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                    color: 'white', border: 'none', borderRadius: '12px',
                    fontWeight: '700', cursor: 'pointer', fontSize: '1rem',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px'
                  }}>
                  Proceed to Checkout <FaArrowRight size={14} />
                </button>
                <Link to="/shop" style={{
                  display: 'block', textAlign: 'center',
                  color: '#888', fontSize: '0.85rem',
                  marginTop: '15px', textDecoration: 'none'
                }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;