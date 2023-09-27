import axios from "axios"

const register = async (userData) => {
    const API_URL = "http://localhost:5000/api/users/signup";
    const response = await axios.post(API_URL, userData);

    if(response.data)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem("user");
}

const login = async (userData) => {
    const API_URL = "http://localhost:5000/api/users/signin";
    const response = await axios.post(API_URL, userData);

    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    register,
    logout,
    login
}

export default authService;