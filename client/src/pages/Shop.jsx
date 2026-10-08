import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { FaSearch, FaShoppingCart, FaEye } from 'react-icons/fa';
import { MdCake } from 'react-icons/md';
import { GiCakeSlice } from 'react-icons/gi';

const categories = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Custom'];

const Shop = () => {
  const [cakes, setCakes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCakes();
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, []);

  useEffect(() => { filterCakes(); }, [cakes, activeCategory, search]);

  const fetchCakes = async () => {
    try {
      const { data } = await API.get('/cakes');
      setCakes(data);
      setFiltered(data);
    } catch (err) {
      toast.error('Failed to load cakes!');
    } finally {
      setLoading(false);
    }
  };

  const filterCakes = () => {
    let result = cakes;
    if (activeCategory !== 'All') {
      result = result.filter(c => c.category === activeCategory);
    }
    if (search) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  };

  const handleAddToCart = (cake) => {
    addToCart(cake);
    toast.success(`${cake.name} added to cart!`);
  };

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
        padding: '60px 0', textAlign: 'center', color: 'white'
      }}>
        
        <h1 style={{ fontWeight: '800', fontSize: '2.5rem' }}>Our Cake Shop</h1>
        <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
          Choose from our delicious collection
        </p>
      </div>

      <div className="container py-5">

        {/* Search */}
        <div style={{ maxWidth: '500px', margin: '0 auto 30px', position: 'relative' }}>
          <FaSearch style={{
            position: 'absolute', left: '15px', top: '50%',
            transform: 'translateY(-50%)', color: '#e91e8c'
          }} />
          <input
            type="text"
            placeholder="Search cakes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 20px 12px 42px',
              borderRadius: '25px', border: '2px solid #fce4ec',
              fontSize: '1rem', outline: 'none'
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex', gap: '10px',
          flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 24px', borderRadius: '25px',
                border: '2px solid #e91e8c',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #e91e8c, #c2185b)' : 'white',
                color: activeCategory === cat ? 'white' : '#e91e8c',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s'
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner-border" style={{ color: '#e91e8c' }} />
            <p style={{ color: '#e91e8c', marginTop: '15px' }}>Loading cakes...</p>
          </div>
        )}

        {/* No Cakes */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <MdCake size={60} color="#fce4ec" />
            <h4 style={{ color: '#c2185b', marginTop: '15px' }}>No cakes found!</h4>
            <p style={{ color: '#888' }}>Try a different category or search</p>
          </div>
        )}

        {/* Cake Grid */}
        <div className="row g-4">
          {filtered.map((cake) => (
            <div key={cake._id} className="col-sm-6 col-lg-4 col-xl-3">
              <div className="card cake-card h-100">
                <div style={{ overflow: 'hidden', height: '220px' }}>
                  <img
                    src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'}
                    alt={cake.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <span style={{
                    background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                    color: 'white', padding: '3px 12px', borderRadius: '20px',
                    fontSize: '0.75rem', fontWeight: '600',
                    width: 'fit-content', marginBottom: '8px'
                  }}>
                    {cake.category}
                  </span>
                  <h5 style={{ fontWeight: '700', marginBottom: '5px' }}>{cake.name}</h5>
                  <p style={{ color: '#888', fontSize: '0.85rem', flexGrow: 1 }}>
                    {cake.description?.slice(0, 60)}...
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#bbb', marginBottom: '5px' }}>
                    {cake.flavors?.join(', ')}
                  </p>
                  <p style={{
                    color: '#e91e8c', fontWeight: '800',
                    fontSize: '1.3rem', margin: '5px 0'
                  }}>
                    Rs. {cake.price?.toLocaleString()}
                  </p>
                  <p style={{
                    fontSize: '0.8rem',
                    color: cake.stock > 0 ? 'green' : 'red',
                    marginBottom: '10px'
                  }}>
                    {cake.stock > 0 ? `✓ In Stock (${cake.stock})` : '✗ Out of Stock'}
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      to={`/cake/${cake._id}`}
                      style={{
                        flex: 1, padding: '8px',
                        border: '2px solid #e91e8c',
                        borderRadius: '10px', color: '#e91e8c',
                        textDecoration: 'none', fontWeight: '600',
                        fontSize: '0.85rem', textAlign: 'center',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '5px'
                      }}>
                      <FaEye size={13} /> View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(cake)}
                      disabled={cake.stock === 0}
                      style={{
                        flex: 1, padding: '8px',
                        background: cake.stock === 0 ? '#ddd' : 'linear-gradient(135deg, #e91e8c, #c2185b)',
                        border: 'none', borderRadius: '10px',
                        color: 'white', fontWeight: '600',
                        fontSize: '0.85rem', cursor: cake.stock === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '5px'
                      }}>
                      <FaShoppingCart size={13} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: 'white', padding: '20px 0' }}>
        <p style={{ textAlign: 'center', margin: 0, color: '#666', fontSize: '0.85rem' }}>
          © 2026 CakeBliss. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Shop;