import { Link } from 'react-router-dom';
import categoryIcons from '../assets/categoryIcons';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import featuredCategories from '../data/categories';

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const slice_start_i = Math.floor(Math.random() * products.length);
  const featured = products.slice(slice_start_i, slice_start_i + 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-light p-5 rounded-3 mb-5 shadow text-center position-relative overflow-hidden" style={{background: 'linear-gradient(120deg, #007bff 60%, #00c6ff 100%)'}}>
        <h1 className="display-3 fw-bold mb-3">Gear Up for Greatness</h1>
        <p className="lead mb-4">Shop the best in sports equipment for every athlete, every sport, every season.</p>
        <Link to="/products" className="btn btn-warning btn-lg px-5 py-3 fw-bold shadow">Shop Now</Link>
        <img src="https://images.unsplash.com/photo-1505843279827-4b2b1b1aba51?auto=format&fit=crop&w=900&q=80" alt="Sports" className="position-absolute top-0 end-0 d-none d-md-block" style={{maxHeight:'100%',width:'40%',objectFit:'cover',opacity:0.15}} />
      </section>

      {/* Featured Categories */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Shop by Category</h2>
        <div className="row justify-content-center g-4">
          {featuredCategories.map(cat => (
            <div className="col-6 col-md-3" key={cat}>
              <Link to={`category/${cat}`} className="text-decoration-none">
                <div className="card text-center h-100 shadow-sm border-0 bg-primary text-light hover-shadow">
                  <div className="card-body py-4">
                    <span className="fs-2 text-warning mb-2 d-block">
                      <i className={categoryIcons[cat]}></i>
                    </span>
                    <h5 className="card-title fw-bold">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Featured Products</h2>
        <div className="row g-4 justify-content-center">
          {featured.map(product => (
                <div className="col-md-4" key={product._id.$oid || product._id}>
                  <ProductCard product={{...product, id: product._id.$oid || product._id}} />
                </div>
              ))}
        </div>
      </section>
    </>
  );
}

export default Home;
