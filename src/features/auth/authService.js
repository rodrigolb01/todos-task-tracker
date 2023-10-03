import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

const register = async (userData) => {
    const response = await axios.post(API_URL + "signup", userData);

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
    const response = await axios.post(API_URL + "signin", userData);

    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const forgotPassword = async (userData) => {
    const response = await axios.post(API_URL + "forgotpassword", userData);

    return response.data
}

const resetPassword = async (userData) => {
    const response = await axios.post(API_URL + `resetpassword/${userData.id}/${userData.token}`, 
    {
        password: userData.password
    });

    return response.data;
}

const authService = {
    register,
    logout,
    login,
    forgotPassword,
    resetPassword
}

export default authService;