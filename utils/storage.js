import jwtDecode from "jwt-decode";
const key = process.env.KEY;

const storeToken = (authToken) => {
  localStorage.setItem(key, window.btoa(authToken));
};

const getToken = () => {
  let base64String = localStorage.getItem(key);
  return window.atob(base64String);
};

const getUser = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  localStorage.removeItem(key);
};

export default {
  getToken,
  removeToken,
  getUser,
  storeToken,
};
