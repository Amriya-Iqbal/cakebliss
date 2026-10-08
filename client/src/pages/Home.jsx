import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { GiCakeSlice } from 'react-icons/gi';
import { FaStar, FaTruck, FaHeart, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';
import heroCake from '../assets/images/hero-cake.jpeg';

const categories = [
  { name: 'Birthday',    icon: <MdCake size={35} color="#e91e8c" />,      color: '#fce4ec' },
  { name: 'Wedding',     icon: <FaHeart size={30} color="#e91e8c" />,     color: '#f8bbd0' },
  { name: 'Anniversary', icon: <FaStar size={30} color="#e91e8c" />,      color: '#fce4ec' },
  { name: 'Custom',      icon: <GiCakeSlice size={32} color="#e91e8c" />, color: '#f8bbd0' },
];

const testimonials = [
  { name: 'Saman',  text: 'Amazing cake! So fresh and delicious!',   stars: 5 },
  { name: 'Dilini', text: 'Perfect wedding cake, everyone loved it!', stars: 5 },
  { name: 'Kasun',  text: 'Best birthday cake I have ever ordered!',  stars: 5 },
];

const Home = () => {
  const [featuredCakes, setFeaturedCakes] = useState([]);

  useEffect(() => {
    fetchFeaturedCakes();
  }, []);

  const fetchFeaturedCakes = async () => {
    try {
      const { data } = await API.get('/cakes');
      setFeaturedCakes(data.slice(0, 4));
    } catch (err) {
      console.error('Failed to load cakes');
    }
  };

  return (
    <div>
      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{
        background: 'linear-gradient(135deg, #f6f4f5 0%, #ece6e8 50%, #fce4ec 100%)',
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundImage: `url(${heroCake})`,
          backgroundSize: 'cover', backgroundPosition: 'center', 
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center" style={{ minHeight: '100vh' }}>

            {/* Left */}
            <div className="col-lg-6 py-5">
              <span style={{
                background: 'linear-gradient(135deg, #dfdcde, #c2185b)',
                color: 'white', padding: '6px 18px', borderRadius: '20px',
                fontSize: '0.85rem', fontWeight: '600',
                display: 'inline-flex', alignItems: 'center',
                gap: '6px', marginBottom: '20px'
              }}>
                <FaHeart size={12} /> Freshly Baked with Love
              </span>

              <h1 style={{
                fontSize: '3.5rem', fontWeight: '900',
                color: '#c2185b', lineHeight: '1.2'
              }}>
                Delicious Cakes<br />
                <span style={{ color: '#e91e8c' }}>For Every</span><br />
                Occasion
              </h1>

              <p style={{ fontSize: '1.2rem', color: '#888', margin: '20px 0 30px' }}>
                Order custom cakes made fresh just for you.
                Choose your flavor, size, and design!
              </p>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/shop" style={{
                  background: 'linear-gradient(135deg, #f5e8ef, #c2185b)',
                  color: 'white', borderRadius: '25px', padding: '13px 30px',
                  textDecoration: 'none', fontWeight: '700', fontSize: '1rem',
                  display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}>
                  <MdCake size={20} /> Order Now
                </Link>
                <Link to="/shop" style={{
                  color: '#e91e8c', border: '2px solid #e91e8c',
                  borderRadius: '25px', padding: '13px 30px',
                  textDecoration: 'none', fontWeight: '700', fontSize: '1rem',
                  display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}>
                  View Menu <FaArrowRight size={14} />
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '40px', marginTop: '50px' }}>
                {[
                  { num: '5+', label: 'Happy Customers', icon: <FaHeart color="#e91e8c" /> },
                  { num: '5+',  label: 'Cake Varieties',  icon: <MdCake color="#e91e8c" /> },
                  { num: '5',    label: 'Star Rating',     icon: <FaStar color="#e91e8c" /> },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.8rem', fontWeight: '800', color: '#e91e8c',
                      display: 'flex', alignItems: 'center',
                      gap: '5px', justifyContent: 'center'
                    }}>
                      {stat.icon} {stat.num}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            
            
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{
            fontWeight: '800', color: '#c2185b', textAlign: 'center',
            fontSize: '2.2rem', marginBottom: '10px'
          }}>
            Shop by Occasion
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>
            Find the perfect cake for every moment
          </p>
          <div className="row g-3">
            {categories.map((cat, i) => (
              <div key={i} className="col-6 col-md-3">
                <Link to={`/shop?category=${cat.name}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: cat.color, textAlign: 'center',
                    padding: '30px 20px', borderRadius: '20px',
                    transition: 'all 0.3s', cursor: 'pointer',
                    border: '2px solid transparent'
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                    {cat.icon}
                    <div style={{ fontWeight: '700', color: '#c2185b', marginTop: '10px' }}>
                      {cat.name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CAKES ─── */}
      <section className="py-5" style={{ background: '#fff5f7' }}>
        <div className="container">
          <h2 style={{
            fontWeight: '800', color: '#c2185b', textAlign: 'center',
            fontSize: '2.2rem', marginBottom: '10px'
          }}>
            Featured Cakes
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>
            Our most loved creations
          </p>

          {featuredCakes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <MdCake size={60} color="#fce4ec" />
              <p style={{ color: '#888', marginTop: '15px' }}>
                No cakes available yet
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {featuredCakes.map((cake) => (
                <div key={cake._id} className="col-sm-6 col-lg-3">
                  <div className="card cake-card h-100">
                    <div style={{ overflow: 'hidden', height: '220px' }}>
                      <img
                        src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'}
                        alt={cake.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-body text-center p-3">
                      <span style={{
                        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                        color: 'white', padding: '4px 14px',
                        borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600'
                      }}>
                        {cake.category}
                      </span>
                      <h5 style={{ fontWeight: '700', margin: '10px 0 5px' }}>
                        {cake.name}
                      </h5>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 8px' }}>
                        {cake.description?.slice(0, 50)}...
                      </p>
                      <p style={{
                        color: '#e91e8c', fontWeight: '800',
                        fontSize: '1.2rem', margin: '0 0 12px'
                      }}>
                        Rs. {cake.price?.toLocaleString()}
                      </p>
                      <Link
                        to={`/cake/${cake._id}`}
                        style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', gap: '6px',
                          background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                          color: 'white', borderRadius: '25px',
                          padding: '10px', textDecoration: 'none',
                          fontWeight: '600', fontSize: '0.9rem'
                        }}>
                        <MdCake size={16} /> Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop" style={{
              color: '#e91e8c', border: '2px solid #e91e8c',
              borderRadius: '25px', padding: '12px 35px',
              textDecoration: 'none', fontWeight: '700',
              display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}>
              View All Cakes <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{
            fontWeight: '800', color: '#c2185b', textAlign: 'center',
            fontSize: '2.2rem', marginBottom: '10px'
          }}>
            Why Choose CakeBliss?
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>
            We bake with love in every layer
          </p>
          <div className="row g-4 text-center">
            {[
              { icon: <MdCake size={40} color="#e91e8c" />,        title: 'Fresh Daily',       desc: 'Baked fresh every morning with premium ingredients' },
              { icon: <GiCakeSlice size={40} color="#e91e8c" />,   title: 'Custom Designs',    desc: 'Personalize your cake with your own message and design' },
              { icon: <FaTruck size={38} color="#e91e8c" />,       title: 'Fast Delivery',     desc: 'Same day delivery available for orders before 12PM' },
              { icon: <FaCheckCircle size={38} color="#e91e8c" />, title: '100% Satisfaction', desc: 'Love your cake or we will make it right' },
            ].map((item, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div style={{
                  background: '#fce4ec', padding: '35px 25px',
                  borderRadius: '20px', height: '100%'
                }}>
                  {item.icon}
                  <h5 style={{ fontWeight: '700', color: '#c2185b', margin: '15px 0 10px' }}>
                    {item.title}
                  </h5>
                  <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ─── CTA BANNER ─── */}
      <section style={{
        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
        padding: '80px 0', textAlign: 'center', color: 'white'
      }}>
        <div className="container" >
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px' }}>
            Ready to Order Your Dream Cake?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '30px' }}>
            Place your order today and get it delivered fresh to your door!
          </p>
          <Link to="/shop" style={{
            background: 'white', color: '#e91e8c',
            borderRadius: '25px', padding: '13px 40px',
            fontWeight: '700', fontSize: '1.1rem', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}>
            <MdCake size={20} /> Order Now
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#1a1a1a', color: 'white', padding: '40px 0 20px' }}>
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '8px', marginBottom: '10px'
              }}>
                <GiCakeSlice size={24} color="#e91e8c" />
                <h4 style={{ color: '#e91e8c', fontWeight: '800', margin: 0 }}>CakeBliss</h4>
              </div>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                Made with love and lots of sugar.
                Your happiness is our recipe!
              </p>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: '#e91e8c', fontWeight: '700' }}>Quick Links</h6>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { label: 'Home',     to: '/' },
                  { label: 'Shop',     to: '/shop' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Login',    to: '/login' },
                ].map((l, i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>
                    <Link to={l.to} style={{
                      color: '#aaa', textDecoration: 'none',
                      fontSize: '0.9rem', display: 'flex',
                      alignItems: 'center', gap: '6px'
                    }}>
                      <FaArrowRight size={10} color="#e91e8c" /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: '#e91e8c', fontWeight: '700' }}>Contact</h6>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0 0 5px' }}>
                📧 hello@cakebliss.com
              </p>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0 0 5px' }}>
                📞 +94 77 123 4567
              </p>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
                📍 Colombo, Sri Lanka
              </p>
            </div>
          </div>
          <hr style={{ borderColor: '#333' }} />
          <p style={{
            color: '#666', fontSize: '0.85rem',
            textAlign: 'center', margin: 0
          }}>
            © 2026 CakeBliss. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;