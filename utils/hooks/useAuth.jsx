import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { AuthLevelContext } from "../context/AuthLevelContext";
import authStorage from "../storage";
import { useRouter } from "next/router";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthLevelContext);
  const router = useRouter();

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    console.log("user", user);
    if (user) setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = (callback) => {
    setUser(null);
    authStorage.removeToken();

    // Redirect to the home page
    router.push("/").then(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
  };

  return { user, logIn, logOut };
};
