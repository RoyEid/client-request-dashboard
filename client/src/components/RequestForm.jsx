import { useState } from "react";
import { createRequest } from "../services/requestApi";

const RequestForm = ({ onRequestCreated }) => {
  const [clientName, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName.trim() || !title.trim()) {
      setError("Client name and request title are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await createRequest({
        clientName: clientName.trim(),
        title: title.trim(),
      });

      onRequestCreated(response.data);

      setClientName("");
      setTitle("");
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message || "Failed to create request. Please try again.";
      setError(serverMessage);
      console.error("Create request error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card request-form-card">
      <div className="card-header">
        <h2>Create New Request</h2>
        <p className="card-subtitle">
          Submit a new client task or feature request to the pipeline.
        </p>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Acme Corp"
              disabled={submitting}
            />
          </div>

          <div className="form-group form-group-flex">
            <label htmlFor="requestTitle">Request Title</label>
            <input
              id="requestTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Update onboarding workflow"
              disabled={submitting}
            />
          </div>

          <div className="form-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Add Request"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
