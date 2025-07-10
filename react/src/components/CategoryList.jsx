function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="list-group mb-4">
      <button
        className={`list-group-item list-group-item-action${selected === null ? ' active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`list-group-item list-group-item-action${selected === cat ? ' active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
