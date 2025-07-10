import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  if (!product) return <div className="alert alert-danger">Product not found.</div>;
  function handleAdd() {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid rounded shadow" />
      </div>
      <div className="col-md-6">
        <h2 className="fw-bold">{product.name}</h2>
        <p className="text-muted">Category: {product.category}</p>
        <p>{product.description}</p>
        <h4 className="fw-bold mb-3">${product.price.toFixed(2)}</h4>
        <button className="btn btn-success btn-lg mb-2" onClick={handleAdd} disabled={added}>
          {added ? 'Added!' : 'Add to Cart'}
        </button>
        <div><Link to="/products">Back to Products</Link></div>
      </div>
    </div>
  );
}

export default ProductDetail;
