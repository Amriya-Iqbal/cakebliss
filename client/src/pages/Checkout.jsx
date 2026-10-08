import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ── Card Form Component ──
const CheckoutForm = ({ formData, cart, totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!formData.deliveryAddress || !formData.deliveryDate) {
      toast.error('Please fill all delivery details!');
      return;
    }

    setLoading(true);

    try {
      // Step 1 — Create payment intent
      const { data } = await API.post('/payment/create-payment-intent', {
        amount: totalPrice
      });

      // Step 2 — Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: formData.name }
        }
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // Step 3 — Place orders in database
        for (const item of cart) {
          await API.post('/orders', {
            cake: item._id,
            customization: {
              flavor: item.selectedFlavor,
              size: item.selectedSize,
              message: item.message || ''
            },
            quantity: item.quantity || 1,
            totalPrice: item.price * (item.quantity || 1),
            deliveryAddress: formData.deliveryAddress,
            deliveryDate: formData.deliveryDate,
            paymentStatus: 'Paid'
          });
        }

        toast.success('Payment successful! Order placed! 🎉');
        onSuccess();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed!');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#2d2d2d',
        '::placeholder': { color: '#bbb' }
      },
      invalid: { color: '#ff4444' }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Card Element */}
      <div style={{
        border: '2px solid #fce4ec',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '20px',
        background: 'white'
      }}>
        <label style={{
          fontWeight: '600', color: '#555',
          fontSize: '0.9rem', display: 'block',
          marginBottom: '10px'
        }}>
          💳 Card Details
        </label>
        <CardElement options={cardStyle} />
      </div>

      {/* Test Card Info */}
      <div style={{
        background: '#fff3cd',
        borderRadius: '10px',
        padding: '12px 15px',
        marginBottom: '20px',
        fontSize: '0.85rem',
        color: '#856404'
      }}>
        🧪 <strong>Test Card:</strong> 4242 4242 4242 4242 | Any future date | Any CVC
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-pink w-100"
        style={{ padding: '13px', borderRadius: '12px', fontWeight: '700' }}>
        {loading ? '⏳ Processing Payment...' : `Pay Rs. ${totalPrice?.toLocaleString()} 🎀`}
      </button>
    </form>
  );
};

// ── Main Checkout Page ──
const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deliveryAddress: user?.address || '',
    deliveryDate: '',
    phone: user?.phone || '',
    name: user?.name || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSuccess = () => {
    clearCart();
    navigate('/profile');
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const inputStyle = {
    borderRadius: '12px',
    padding: '12px 15px',
    border: '2px solid #fce4ec',
    fontSize: '0.95rem',
    width: '100%',
    outline: 'none',
    marginTop: '6px'
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#555',
    fontSize: '0.9rem'
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem' }}>🛒</div>
          <h4 style={{ color: '#c2185b' }}>Your cart is empty!</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <h2 style={{ fontWeight: '800', color: '#c2185b', marginBottom: '30px' }}>
          💳 Checkout
        </h2>

        <div className="row g-4">

          {/* Left — Delivery + Payment */}
          <div className="col-lg-7">

            {/* Delivery Details */}
            <div style={{
              background: 'white', borderRadius: '20px',
              padding: '30px', marginBottom: '20px',
              boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
            }}>
              <h5 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '20px' }}>
                📦 Delivery Details
              </h5>

              <div className="mb-3">
                <label style={labelStyle}>👤 Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  style={inputStyle}
                />
              </div>

              <div className="mb-3">
                <label style={labelStyle}>📍 Delivery Address</label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  required
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <div className="mb-3">
                <label style={labelStyle}>📞 Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  style={inputStyle}
                />
              </div>

              <div className="mb-3">
                <label style={labelStyle}>📅 Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  min={minDate}
                  required
                  style={inputStyle}
                />
                <small style={{ color: '#bbb' }}>
                  Minimum 1 day preparation needed
                </small>
              </div>
            </div>

            {/* Payment Form */}
            <div style={{
              background: 'white', borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
            }}>
              <h5 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '20px' }}>
                💳 Payment
              </h5>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  formData={formData}
                  cart={cart}
                  totalPrice={totalPrice}
                  onSuccess={handleSuccess}
                />
              </Elements>
            </div>

          </div>

          {/* Right — Order Summary */}
          <div className="col-lg-5">
            <div style={{
              background: 'white', borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(233,30,140,0.1)',
              position: 'sticky', top: '20px'
            }}>
              <h5 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '20px' }}>
                🎂 Order Summary
              </h5>

              {cart.map((item, index) => (
                <div key={index} style={{
                  display: 'flex', gap: '12px',
                  paddingBottom: '12px', marginBottom: '12px',
                  borderBottom: '1px solid #fce4ec'
                }}>
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100'}
                    alt={item.name}
                    style={{
                      width: '65px', height: '65px',
                      objectFit: 'cover', borderRadius: '10px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', margin: 0, fontSize: '0.9rem' }}>
                      {item.name}
                    </p>
                    <p style={{ color: '#888', fontSize: '0.75rem', margin: '3px 0' }}>
                      {item.selectedFlavor} | {item.selectedSize} | Qty: {item.quantity || 1}
                    </p>
                    <p style={{ color: '#e91e8c', fontWeight: '700', margin: 0 }}>
                      Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: '#888' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#888' }}>Delivery</span>
                <span style={{ color: 'green', fontWeight: '600' }}>Free</span>
              </div>

              <hr style={{ borderColor: '#fce4ec' }} />

              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                <span style={{
                  fontWeight: '800', fontSize: '1.4rem', color: '#e91e8c'
                }}>
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              <div style={{
                background: '#fce4ec', borderRadius: '10px',
                padding: '12px', marginTop: '15px',
                fontSize: '0.85rem', color: '#c2185b', textAlign: 'center'
              }}>
                🔒 Secured by Stripe
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;