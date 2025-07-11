import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRec, setLoadingRec] = useState(true);
  const inCart = cart.some(item => item.id === id);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/products/id/${id}`);
      const data = await res.json();
      setProduct({...data, id: data._id?.$oid || data._id});
      setLoading(false);
    }
    async function fetchRecommend() {
      setLoadingRec(true);
      const res = await fetch(`http://localhost:3000/api/recommend/${id}`);
      const data = await res.json();
      setRecommend(data.recommended || []);
      setLoadingRec(false);
    }
    fetchProduct();
    fetchRecommend();
  }, [id]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

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
        <div className="mt-4">
          <h5>Recommended Products</h5>
          {loadingRec ? (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60px'}}>
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : recommend.length > 0 ? (
            <ul>
              {recommend.map(rid => (
                <li key={rid}><Link to={`/products/${rid}`}>Product {rid}</Link></li>
              ))}
            </ul>
          ) : <div>No recommendations.</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
