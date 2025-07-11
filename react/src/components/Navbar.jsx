import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import AthleteArsenalLogo from '../assets/AthleteArsenalLogo.svg';

function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.length;
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
            <Link 
                className="navbar-brand fw-bold d-flex align-items-center text-white"
                to="/"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', fontSize: '2rem' }}
            >
                <img
                    src={AthleteArsenalLogo}
                    alt="Athlete Arsenal"
                    style={{ width: '56px', height: '56px', marginRight: '20px', filter: 'invert(1) brightness(2)' }}
                />
                Athlete Arsenal
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link fw-bold text-white" to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-bold text-white" to="/cart">
                            Cart {cartCount > 0 && <span className="badge bg-warning text-dark ms-1">{cartCount}</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
}

export default Navbar;
