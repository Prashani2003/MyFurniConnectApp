import axios from "axios";

const API = axios.create({
  baseURL: "http://10.16.190.247:5000/api",
  timeout: 5000,
});

// 🔐 SET AUTH TOKEN
export const setAuthToken = (token) => {

  if (token) {
    API.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }

};

// ===============================
// AUTH
// ===============================

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

// ===============================
// JOBS
// ===============================

export const createJob = (data) =>
  API.post("/jobs", data);

export const getJobs = () =>
  API.get("/jobs");

export const applyJob = (jobId) =>
  API.post(`/jobs/${jobId}/apply`);

// ===============================
// APPLICATIONS
// ===============================

export const getApplications = () =>
  API.get("/jobs/applications");

export const getMyJobs = () =>
  API.get("/jobs/my");

export const updateApplicationStatus = (id, status) =>
  API.put(`/jobs/applications/${id}`, {
    status
  });

export const getMyApplications = () =>
  API.get("/jobs/my-applications");

// ===============================
// CHAT
// ===============================

export const getMessages =
  (jobId, userId) =>
    API.get(
      `/chat/${jobId}/${userId}`
    );

export const sendMessage =
  (data) =>
    API.post(
      "/chat",
      data
    );

// ===============================
// REVIEWS
// ===============================

export const addReview = (data) =>
  API.post("/reviews", data);

export const getReviews = () =>
  API.get("/reviews");

export const getMyReviews = () =>
  API.get(
    "/reviews/my-reviews"
  );

// ===============================
// ADMIN USERS
// ===============================

export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

// ===============================
// ADMIN JOBS
// ===============================

export const getAllJobs = () =>
  API.get("/admin/jobs");

export const deleteJob = (id) =>
  API.delete(`/admin/jobs/${id}`);


// ===============================
// MATERIALS
// ===============================

export const addMaterial = (data) =>
  API.post(
    "/materials",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

// GET ALL MATERIALS
export const getMaterials = () =>
  API.get("/materials");

export const getMyMaterials = () =>
  API.get("/materials/my");

export const deleteMaterial = (id) =>
  API.delete(`/materials/${id}`);

// ===============================
// SERVICE POSTS
// ===============================

export const createWorkPost =
  (data) =>
    API.post(
      "/works",
      data,
      {
        headers: {
          "Content-Type":
          "multipart/form-data"
        }
      }
    );
export const getServicePosts =() =>
    API.get("/works");

export const getUserProfile =
  (id) =>
    API.get(`/users/${id}`);

// ===============================
// EXPORT
// ===============================

export default API;