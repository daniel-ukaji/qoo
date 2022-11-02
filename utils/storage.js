import jwtDecode from "jwt-decode";
const key = process.env.NEXT_PUBLIC_KEY;

const storeToken = (authToken) => {
  localStorage.setItem(key, window.btoa(authToken));
};

const getToken = () => {
  let base64String = localStorage.getItem(key);
  console.log("base64String", base64String);
  return base64String ? window.atob(base64String) : null;
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
