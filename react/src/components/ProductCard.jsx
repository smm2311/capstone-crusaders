import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} className="card-img-top" alt={product.name} style={{objectFit:'cover',height:'200px'}} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.category}</p>
        <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
        <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">View Details</Link>
      </div>
    </div>
  );
}

export default ProductCard;
