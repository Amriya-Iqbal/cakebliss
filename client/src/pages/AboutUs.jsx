import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { GiCakeSlice } from 'react-icons/gi';
import { FaHeart, FaStar, FaTruck, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';

const AboutUs = () => {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
        padding: '80px 0', textAlign: 'center', color: 'white'
      }}>
        
        <h1 style={{ fontWeight: '800', fontSize: '2.8rem' }}>About CakeBliss</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '15px auto 0' }}>
          We bake happiness into every cake, made fresh with love just for you!
        </p>
      </div>

      {/* Our Story */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                alt="Our Bakery"
                style={{
                  width: '100%', height: '400px',
                  objectFit: 'cover', borderRadius: '25px',
                  boxShadow: '0 20px 50px rgba(233,30,140,0.2)'
                }}
              />
            </div>
            <div className="col-lg-6">
              <span style={{
                background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                color: 'white', padding: '5px 15px', borderRadius: '20px',
                fontSize: '0.85rem', fontWeight: '600',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                <FaHeart size={12} /> Our Story
              </span>
              <h2 style={{
                fontWeight: '800', color: '#c2185b',
                fontSize: '2.2rem', margin: '15px 0'
              }}>
                Baking with Love Since 2018
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>
                CakeBliss started as a small home bakery with one simple mission —
                to bring joy to people through delicious, beautifully crafted cakes.
                What began in a tiny kitchen has grown into a beloved bakery
                serving hundreds of happy customers every month.
              </p>
              <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>
                Every cake we make is baked fresh using only the finest ingredients.
                We believe that a great cake doesn't just taste amazing —
                it creates memories that last a lifetime.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
                {[
                  { num: '500+', label: 'Happy Customers', icon: <FaHeart color="#e91e8c" /> },
                  { num: '50+',  label: 'Cake Varieties',  icon: <MdCake color="#e91e8c" /> },
                  { num: '8+',   label: 'Years Experience', icon: <FaStar color="#e91e8c" /> },
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

      {/* Our Values */}
      <section className="py-5" style={{ background: '#fff5f7' }}>
        <div className="container">
          <h2 style={{
            fontWeight: '800', color: '#c2185b', textAlign: 'center',
            fontSize: '2.2rem', marginBottom: '10px'
          }}>
            Our Values
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>
            What makes CakeBliss special
          </p>
          <div className="row g-4">
            {[
              { icon: <FaHeart size={35} color="#e91e8c" />,       title: 'Made with Love',    desc: 'Every cake is handcrafted with passion and care by our expert bakers' },
              { icon: <GiCakeSlice size={35} color="#e91e8c" />,   title: 'Fresh Ingredients', desc: 'We use only the finest, freshest ingredients sourced locally every day' },
              { icon: <FaStar size={35} color="#e91e8c" />,        title: 'Custom Designs',    desc: 'Your vision, our expertise — we create cakes as unique as you are' },
              { icon: <FaCheckCircle size={35} color="#e91e8c" />, title: 'Customer First',    desc: 'Your happiness is our top priority — we go above and beyond every time' },
            ].map((val, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div style={{
                  background: 'white', borderRadius: '20px',
                  padding: '35px 25px', textAlign: 'center', height: '100%',
                  boxShadow: '0 4px 15px rgba(233,30,140,0.1)'
                }}>
                  <div style={{
                    background: '#fce4ec', width: '70px', height: '70px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 15px'
                  }}>
                    {val.icon}
                  </div>
                  <h5 style={{ fontWeight: '700', color: '#c2185b' }}>{val.title}</h5>
                  <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Find Us */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{
            fontWeight: '800', color: '#c2185b', textAlign: 'center',
            fontSize: '2.2rem', marginBottom: '10px'
          }}>
            Find Us
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>
            We'd love to hear from you
          </p>
          <div className="row g-4 justify-content-center">
            {[
              { icon: <FaMapMarkerAlt size={28} color="#e91e8c" />, title: 'Address', info: 'No. 45, Galle Road, Colombo 03, Sri Lanka' },
              { icon: <FaPhone size={28} color="#e91e8c" />,        title: 'Phone',   info: '+94 77 123 4567' },
              { icon: <FaEnvelope size={28} color="#e91e8c" />,     title: 'Email',   info: 'hello@cakebliss.com' },
              { icon: <FaClock size={28} color="#e91e8c" />,        title: 'Hours',   info: 'Mon–Sat: 8AM – 8PM' },
            ].map((contact, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div style={{
                  background: '#fff5f7', borderRadius: '20px',
                  padding: '30px 25px', textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(233,30,140,0.08)'
                }}>
                  <div style={{
                    background: '#fce4ec', width: '60px', height: '60px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 15px'
                  }}>
                    {contact.icon}
                  </div>
                  <h6 style={{ fontWeight: '700', color: '#c2185b', marginBottom: '8px' }}>
                    {contact.title}
                  </h6>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                    {contact.info}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
        padding: '80px 0', textAlign: 'center', color: 'white'
      }}>
        <div className="container">
          
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '15px' }}>
            Ready to Order Your Dream Cake?
          </h2>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', marginBottom: '30px' }}>
            Let us bake something magical just for you!
          </p>
          <Link to="/shop" style={{
            background: 'white', color: '#e91e8c',
            borderRadius: '25px', padding: '13px 40px',
            fontWeight: '700', fontSize: '1.1rem',
            textDecoration: 'none', display: 'inline-flex',
            alignItems: 'center', gap: '8px'
          }}>
            <MdCake size={20} /> Order Now <FaArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: 'white', padding: '20px 0' }}>
        <p style={{ textAlign: 'center', margin: 0, color: '#666', fontSize: '0.85rem' }}>
          © 2026 CakeBliss. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default AboutUs;