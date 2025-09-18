import axios from 'axios'

const API_URL = 'http://localhost:5000/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  console.log("axios response:", response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  console.log("logging out user");
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService