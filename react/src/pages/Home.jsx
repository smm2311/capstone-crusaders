import { Link } from 'react-router-dom';
import categories from '../data/categories';
import products from '../data/products';
import categoryIcons from '../assets/categoryIcons';

function Home() {
  const featured = products.slice(0, 3);
  const featuredCategories = categories.slice(0, 4);

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
              <Link to="/products" className="text-decoration-none">
                <div className="card text-center h-100 shadow-sm border-0 bg-primary text-light hover-shadow">
                  <div className="card-body py-4">
                    <span className="fs-2 text-warning mb-2 d-block">
                      <i className={categoryIcons[cat]}></i>
                    </span>
                    <h5 className="card-title fw-bold">{cat}</h5>
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
            <div className="col-12 col-md-4" key={product.id}>
              <div className="card h-100 shadow-sm border-0">
                <img src={product.image} className="card-img-top" alt={product.name} style={{objectFit:'cover',height:'220px'}} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.category}</p>
                  <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
                  <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
