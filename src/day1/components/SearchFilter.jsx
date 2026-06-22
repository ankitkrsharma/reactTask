function SearchFilter({ filters, setFilters, categories }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Search & Filters</h5>

        <div className="row g-3">s
          <div className="col-md-4">
            <label className="form-label">Search by Title</label>
            <input
              type="text"
              className="form-control"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <button className="btn btn-outline-secondary mt-3" onClick={clearFilters} type="button">
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;