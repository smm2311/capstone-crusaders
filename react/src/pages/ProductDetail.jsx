import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

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
      setRecommend(data || []);
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
        <img src={`/src/assets/${product.category}_${product.productName.replaceAll(' ', '_')}.jpg`} alt={product.productName} className="img-fluid rounded shadow" />
      </div>

      <div className="col-md-6">
        <h2 className="fw-bold">{product.name}</h2>
        <p className="text-muted">Category: {product.category}</p>
        <p className="text-muted">Product Name: {product.productName}</p>
        <p className="text-muted">Color: {product.color}</p>
        <p className="text-muted">Size: {product.size}</p>
        <h4 className="fw-bold mb-3">${product.price?.toFixed(2) ?? product.price}</h4>
        <button className="btn btn-success btn-lg mb-2" onClick={handleAdd} disabled={inCart}>
          {inCart ? <i className="bi bi-check-circle-fill"></i> : 'Add to Cart'}
        </button>
        <div><Link to="/products">Back to Products</Link></div>
    </div>

    <div className="row">
        <div className="mt-4">
          <h5>Recommended Products</h5>
          {loadingRec ? (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60px'}}>
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : recommend.length > 0 ? (
            <ul className="d-flex" style={{"paddingLeft": 0}}>
              {recommend.map(recommendedProduct => (
                <div className="col-md-3 mx-2" key={recommendedProduct._id.$oid || recommendedProduct._id}>
                  <ProductCard product={{...recommendedProduct, id: recommendedProduct._id.$oid || recommendedProduct._id}} />
                </div>
              ))}
            </ul>
          ) : <div>No recommendations.</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
