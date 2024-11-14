import axios from "axios";
import { getToken } from "./utility";

const API_URL = "http://localhost:8080/api/todos";

const AUTH_API_URL = "http://localhost:8080/api/auth";

// request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

//  TODO API's

export const getAllTodos = async () => {
  try {
    return await axios.get(`${API_URL}`);
  } catch (error) {
    console.log("error while calling getAllTodos api", error.message);
  }
};

export const createTodo = async (data) => {
  try {
    return await axios.post(`${API_URL}`, data);
  } catch (error) {
    console.log("error while calling createTodo api", error.message);
  }
};

export const getTodoById = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.log("error while calling getTodoById api", error.message);
  }
};

export const updateTodo = async (data, id) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch (error) {
    console.log("error while using updateTodo api", error.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log("error while calling deleteTodo api", error.message);
  }
};

export const completeTodo = async (id) => {
  try {
    return await axios.patch(`${API_URL}/${id}/complete`);
  } catch (error) {
    console.log("error while calling completeTodo api");
  }
};

export const incompleteTodo = async (id) => {
  try {
    return await axios.patch(`${API_URL}/${id}/in-complete`);
  } catch (error) {
    console.log("error while calling incompleteTodo api");
  }
};

// AUTH API's

export const registerApi = async (data) => {
  try {
    return await axios.post(`${AUTH_API_URL}/register`, data);
  } catch (error) {
    console.log("error while calling register api");
  }
};

export const loginApi = async (usernameOrEmail, password) => {
  try {
    return await instance.post(`${AUTH_API_URL}/login`, {
      usernameOrEmail,
      password,
    });
  } catch (error) {
    console.log("Error while calling login api", error);
  }
};
