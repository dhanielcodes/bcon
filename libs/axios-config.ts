import axios from "axios";
import toast from "react-hot-toast";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  function (response) {
    if (response?.config?.method !== "get") {
      if (
        response?.request?.__URL__?.includes(
          "checkifusertransactionrequiredocument"
        )
      ) {
      } else {
        toast.success(response?.data?.message, {
          //icon:'✅',
          style: {
            borderRadius: "1100px",
            border: "1px solid green",
            color: "#000",
            fontSize: "14px",
          },
        });
      }
      return response;
    }
    return response;
  },
  function (error) {
    if (error?.config?.method !== "get") {
      toast.error(error?.response?.data?.message || error?.message, {
        //icon:'❌',
        style: {
          borderRadius: "1100px",
          border: "1px solid red",
          color: "red",
          fontSize: "14px",
        },
      });
      return;
    }
    if (error?.response?.data?.message === "Invalid token, Expired") {
      localStorage.clear();
    }

    if (401 === error?.response?.status) {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/forgot-password" ||
        window.location.pathname === "/register" ||
        window.location.pathname === "/create-account" ||
        window.location.pathname === "/login"
      ) {
        return;
      } else {
        localStorage.clear();
      }
    } else if (
      "Request failed with status code 500" === error.message ||
      error?.response?.status >= 500
    ) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);
