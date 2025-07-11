import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';
import { useParams } from 'react-router-dom';
import fileCategories from '../data/categories';

function Products() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(params['category'] ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let url = selectedCategory
        ? `http://localhost:3000/api/products/category/${selectedCategory.toLowerCase()}`
        : 'http://localhost:3000/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="row">
      <div className="col-md-3">
        <CategoryList 
            categories={fileCategories}
            selected={selectedCategory} 
            onSelect={setSelectedCategory}
        />
      </div>
      <div className="col-md-9">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
            <div className="spinner-border text-primary" style={{width: '4rem', height: '4rem'}} role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {products.map(product => (
              <div className="col-md-4" key={product._id.$oid || product._id}>
                <ProductCard product={{...product, id: product._id.$oid || product._id}} />
              </div>
            ))}
            {products.length === 0 && <div className="col-12"><p className="text-center">No products found.</p></div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
