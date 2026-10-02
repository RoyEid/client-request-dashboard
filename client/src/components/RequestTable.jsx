const RequestTable = ({ requests, onStatusUpdate, updatingId }) => {
  const getNextStatus = (status) => {
    if (status === "New") {
      return "In Progress";
    }

    if (status === "In Progress") {
      return "Done";
    }

    return null;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New":
        return "badge badge-new";
      case "In Progress":
        return "badge badge-in-progress";
      case "Done":
        return "badge badge-done";
      default:
        return "badge";
    }
  };

  return (
    <div className="table-responsive">
      <table className="request-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Request</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => {
            const nextStatus = getNextStatus(request.status);
            const isUpdating = updatingId === request._id;

            return (
              <tr key={request._id}>
                <td className="client-cell">
                  <div className="client-info">
                    <span className="client-avatar">
                      {request.clientName ? request.clientName.charAt(0).toUpperCase() : "C"}
                    </span>
                    <span className="client-name">{request.clientName}</span>
                  </div>
                </td>

                <td className="title-cell">
                  <span className="request-title">{request.title}</span>
                </td>

                <td className="status-cell">
                  <span className={getStatusBadgeClass(request.status)}>
                    {request.status}
                  </span>
                </td>

                <td className="action-cell">
                  {nextStatus ? (
                    <button
                      className="btn btn-action"
                      onClick={() => onStatusUpdate(request._id, nextStatus)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : nextStatus}
                    </button>
                  ) : (
                    <span className="completed-label">Completed</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;