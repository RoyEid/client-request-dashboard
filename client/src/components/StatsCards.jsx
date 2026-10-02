const StatsCards = ({ requests = [] }) => {
  const total = requests.length;

  const newCount = requests.filter(
    (request) => request.status === "New"
  ).length;

  const inProgressCount = requests.filter(
    (request) => request.status === "In Progress"
  ).length;

  const doneCount = requests.filter(
    (request) => request.status === "Done"
  ).length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Requests</span>
          <span className="stat-icon total-icon">📊</span>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-subtext">All submitted client requests</div>
      </div>

      <div className="stat-card stat-card-new">
        <div className="stat-header">
          <span className="stat-label">New</span>
          <span className="stat-icon new-icon">🔵</span>
        </div>
        <div className="stat-value">{newCount}</div>
        <div className="stat-subtext">Awaiting initial review</div>
      </div>

      <div className="stat-card stat-card-in-progress">
        <div className="stat-header">
          <span className="stat-label">In Progress</span>
          <span className="stat-icon progress-icon">🟠</span>
        </div>
        <div className="stat-value">{inProgressCount}</div>
        <div className="stat-subtext">Currently being worked on</div>
      </div>

      <div className="stat-card stat-card-done">
        <div className="stat-header">
          <span className="stat-label">Done</span>
          <span className="stat-icon done-icon">🟢</span>
        </div>
        <div className="stat-value">{doneCount}</div>
        <div className="stat-subtext">Successfully completed</div>
      </div>
    </div>
  );
};

export default StatsCards;
