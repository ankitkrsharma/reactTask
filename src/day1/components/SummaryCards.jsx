function SummaryCards({ total, open, inProgress, resolved }) {
  const cards = [
    { label: "Total Requests", value: total, border: "border-primary" },
    { label: "Open", value: open, border: "border-danger" },
    { label: "In Progress", value: inProgress, border: "border-warning" },
    { label: "Resolved", value: resolved, border: "border-success" },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-12 col-md-6 col-lg-3" key={card.label}>
          <div className={`card shadow-sm h-100 border-start border-4 ${card.border}`}>
            <div className="card-body">
              <p className="text-muted mb-1">{card.label}</p>
              <h3 className="mb-0">{card.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;