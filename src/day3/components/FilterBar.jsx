function FilterBar({ filters, onChange, onClear, categories }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Advanced Filters</h5>

        <div className="row g-3">
          <div className="col-md-4 col-lg-3">
            <label className="form-label">Search by title</label>
            <input
              type="text"
              className="form-control"
              name="search"
              value={filters.search}
              onChange={onChange}
              placeholder="Search complaint"
            />
          </div>

          <div className="col-md-4 col-lg-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={filters.category}
              onChange={onChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={onChange}
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={filters.priority}
              onChange={onChange}
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Sort by</label>
            <select
              className="form-select"
              name="sortBy"
              value={filters.sortBy}
              onChange={onChange}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        <button type="button" className="btn btn-outline-secondary mt-3" onClick={onClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;