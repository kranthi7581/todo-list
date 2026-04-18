import axios from "axios";

<<<<<<< HEAD
const SERVER_URL = `import.meta.env.VITE_API_URL`;
=======
const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
>>>>>>> 1b3f301 (render)

const registerUser = (data) => {
    return axios.post(`${API_BASE_URL}/register`, data);
};

const loginUser = (data) => {
    return axios.post(`${API_BASE_URL}/login`, data);
};

const AuthServices = {
    registerUser,
    loginUser,
};

export default AuthServices;
