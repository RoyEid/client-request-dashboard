import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequests, updateRequestStatus } from "../services/requestApi";
import RequestTable from "../components/RequestTable";
import RequestForm from "../components/RequestForm";
import StatsCards from "../components/StatsCards";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequests();
      setRequests(response.data);
    } catch (err) {
      setError("Unable to load requests. Please check your connection and try again.");
      console.error("Fetch requests error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialRequests = async () => {
      try {
        const response = await getRequests();
        if (isMounted) {
          setRequests(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load requests. Please check your connection and try again.");
          console.error("Fetch requests error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setUpdatingId(id);
      const response = await updateRequestStatus(id, status);

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? response.data : request
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRequestCreated = (newRequest) => {
    setRequests((prevRequests) => [newRequest, ...prevRequests]);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="header-brand">
          <div className="brand-logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">Client Requests</h1>
            <p className="header-subtitle">
              Manage, track, and update client requests in real-time
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={handleLogout}
            className="btn btn-outline"
            title="Sign out of dashboard"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {/* Stats Grid */}
        <StatsCards requests={requests} />

        {/* Create Request Card */}
        <RequestForm onRequestCreated={handleRequestCreated} />

        {/* Client Requests Table Card */}
        <div className="card table-card">
          <div className="card-header table-card-header">
            <div>
              <h2>Client Requests</h2>
              <p className="card-subtitle">
                Current requests and status progression workflow
              </p>
            </div>
            {!loading && !error && (
              <span className="total-badge">
                {requests.length} {requests.length === 1 ? "Request" : "Requests"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="state-container">
              <div className="spinner" aria-label="Loading"></div>
              <p className="state-message">Loading client requests...</p>
            </div>
          ) : error ? (
            <div className="state-container error-state">
              <p className="error-text">{error}</p>
              <button onClick={fetchRequests} className="btn btn-primary btn-sm">
                Try Again
              </button>
            </div>
          ) : requests.length === 0 ? (
            <div className="state-container empty-state">
              <div className="empty-icon">📋</div>
              <h3>No client requests yet</h3>
              <p className="state-message">
                Submit a client name and title using the form above to get started.
              </p>
            </div>
          ) : (
            <RequestTable
              requests={requests}
              onStatusUpdate={handleStatusUpdate}
              updatingId={updatingId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
