import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE}/requests`;

export const getRequests = () => {
  return axios.get(API_URL);
};

export const createRequest = (data) => {
  return axios.post(API_URL, data);
};

export const updateRequestStatus = (id, status) => {
  return axios.patch(`${API_URL}/${id}/status`, { status });
};