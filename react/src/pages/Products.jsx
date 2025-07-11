import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/products');
      const data = await res.json();
      setProducts(data);
      setCategories([...new Set(data.map(p => p.category))]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchByCategory() {
      setLoading(true);
      let url = selectedCategory
        ? `http://localhost:3000/api/products/category/${selectedCategory}`
        : 'http://localhost:3000/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchByCategory();
  }, [selectedCategory]);

  return (
    <div className="row">
      <div className="col-md-3">
        <CategoryList 
            categories={categories} 
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
