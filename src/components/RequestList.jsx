import RequestCard from "../day2/components/RequestCard";

function RequestList({
  requests,
  isAdmin = false,
  onStatusUpdate,
}) {
  if (requests.length === 0) {
    return (
      <div className="alert alert-info">
        No requests found.
      </div>
    );
  }

  return (
    <div className="d-grid gap-3">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          isAdmin={isAdmin}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
}

export default RequestList;