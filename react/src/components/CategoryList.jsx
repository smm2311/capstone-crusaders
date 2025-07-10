function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="list-group mb-4">
      <button
        className={`list-group-item list-group-item-action${selected === null ? ' active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`list-group-item list-group-item-action${selected === category ? ' active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
