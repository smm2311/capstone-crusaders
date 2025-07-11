import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const inCart = cart.some(item => item.id === product.id);
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    if (!inCart) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1000);
    }
  }

  return (
    <div className="card h-100 shadow-sm">
      <img src={`/src/assets/${product.category}_${product.productName.replaceAll(' ', '_')}.jpg`} className="card-img-top" alt={product.productName} style={{objectFit:'cover',height:'200px'}} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="card-title mb-0">{product.productName.charAt(0).toUpperCase() + product.productName.slice(1)}</h5>
          <button className="btn btn-sm btn-success ms-2 position-relative d-flex align-items-center justify-content-center" onClick={handleAdd} disabled={inCart} title="Add to Cart" style={{width:36,height:36,padding:0}}>
            <i className={`bi ${inCart ? 'bi-check-circle-fill' : 'bi-cart-plus'}`} style={{fontSize:'1.3rem',transition:'color 0.2s'}}></i>
          </button>
        </div>
        <p className="card-text text-muted">{product.category}</p>
        <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
        <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">View Details</Link>
      </div>
    </div>
  );
}

export default ProductCard;
