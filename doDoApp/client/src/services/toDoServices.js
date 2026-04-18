import axios from "axios";
import { getUserDetails } from "../util/GetUser";

<<<<<<< HEAD
const SERVER_URL = `${import.meta.env.VITE_API_URL}/todo`;
=======
const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
const TODO_BASE_URL = `${API_BASE_URL}/todo`;
>>>>>>> 1b3f301 (render)

const authHeaders = () => {
    const userToken = getUserDetails()?.token;
    if (!userToken) return {}; // no token, allow request to fail naturally
    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
};

const createToDo = (data) => {
    return axios.post(`${TODO_BASE_URL}/create-to-do`, data, authHeaders());
};

const getAllToDo = (userId) => {
    return axios.get(`${TODO_BASE_URL}/get-all-to-do/${userId}`, authHeaders());
};

const deleteToDo = (id) => {
    return axios.delete(`${TODO_BASE_URL}/delete-to-do/${id}`, authHeaders());
};

const updateToDo = (id, data) => {
    return axios.patch(`${TODO_BASE_URL}/update-to-do/${id}`, data, authHeaders());
};

const AuthServices = {
    createToDo,
    getAllToDo,
    deleteToDo,
    updateToDo,
};

export default AuthServices;
