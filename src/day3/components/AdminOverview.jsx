function AdminOverview({ categoryCounts, highPriorityOpen }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Admin Overview</h5>

        <div className="alert alert-warning">
          <strong>High Priority Open Issues:</strong> {highPriorityOpen}
        </div>

        <h6 className="mb-3">Category-wise Counts</h6>

        {categoryCounts.length === 0 ? (
          <div className="alert alert-info mb-0">No category data available.</div>
        ) : (
          <ul className="list-group">
            {categoryCounts.map((item) => (
              <li
                key={item.name}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.name}</span>
                <span className="badge bg-primary rounded-pill">{item.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminOverview;