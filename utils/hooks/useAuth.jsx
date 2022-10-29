import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { AuthLevelContext } from "../context/AuthLevelContext";
import authStorage from "../storage";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthLevelContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    if (user) setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
