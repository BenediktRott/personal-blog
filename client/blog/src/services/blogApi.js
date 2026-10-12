import { body } from "express-validator";

const API_URL = import.meta.env.VITE_BLOG_API_URL;

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = (await response).json().catch(() => ({}));

    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`,
    );
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  getPosts: () => apiRequest("/posts"),
  getPostsId: (id) => apiRequest(`/posts/${id}`),
  createPost: (postData) =>
    apiRequest("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    }),
  getLatest: () => apiRequest("/posts/latest"),
  getComments: (postId) => apiRequest(`/posts/${postId}/comments`),
  createComment: (text, postId) =>
    apiRequest(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(text),
    }),
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  register: (credentials) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};
