import { useState } from 'react';
import productsData from '../data/products';
import categoriesData from '../data/categories';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filtered = selectedCategory ? productsData.filter(p => p.category === selectedCategory) : productsData;

  return (
    <div className="row">
      <div className="col-md-3">
        <CategoryList categories={categoriesData} selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="col-md-9">
        <div className="row g-4">
          {filtered.map(product => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
          {filtered.length === 0 && <div className="col-12"><p className="text-center">No products found.</p></div>}
        </div>
      </div>
    </div>
  );
}

export default Products;
