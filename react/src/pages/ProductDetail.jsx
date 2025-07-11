import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const inCart = cart.some(item => item.id === id);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/id/${id}`)
      .then(res => res.json())
      .then(data => setProduct({...data, id: data._id?.$oid || data._id}));
    fetch(`http://localhost:3000/api/recommend/${id}`)
      .then(res => res.json())
      .then(data => setRecommend(data.recommended || []));
  }, [id]);

  if (!product) return <div className="alert alert-info">Loading...</div>;

  function handleAdd() {
    if (!inCart) addToCart(product);
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
        <h4 className="fw-bold mb-3">${product.price?.toFixed(2) ?? product.price}</h4>
        <button className="btn btn-success btn-lg mb-2" onClick={handleAdd} disabled={inCart}>
          {inCart ? <i className="bi bi-check-circle-fill text-warning"></i> : 'Add to Cart'}
        </button>
        <div><Link to="/products">Back to Products</Link></div>
        {recommend.length > 0 && (
          <div className="mt-4">
            <h5>Recommended Products</h5>
            <ul>
              {recommend.map(rid => (
                <li key={rid}><Link to={`/products/${rid}`}>Product {rid}</Link></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
