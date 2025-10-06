import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ** add JWT
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ** remove JWT
export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = "";
};
