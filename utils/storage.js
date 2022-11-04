import jwtDecode from "jwt-decode";
const key = process.env.NEXT_PUBLIC_KEY;

const storeToken = (authToken) => {
  localStorage.setItem(key, window.btoa(authToken));
};

const getToken = () => {
  if (typeof window !== "undefined") {
    let base64String = localStorage.getItem(key);
    return base64String ? window.atob(base64String) : null;
  }
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
