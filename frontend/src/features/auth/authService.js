import axios from "axios";

const API_URL = "https://recordkeepr.herokuapp.com/api/users/";

// register user
const register = async (userData) => {
  console.log(API_URL);
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login user
const login = async (userData) => {
  console.log(API_URL);
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
