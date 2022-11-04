import { useEffect, useState } from "react";
import "../styles/globals.css";
import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authStorage from "../utils/storage";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("NONE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const restoreUser = async () => {
    console.log("Working...");
    const user = authStorage.getUser();
    if (user && user.exp) {
      let expiryDate = user?.exp ? user.exp * 1000 : 1000;
      const isUserNotAllowedIntoTheApp =
        !user?.userId || (user.exp && user?.exp > expiryDate);

      console.log("isUserNotAllowedIntoTheApp", isUserNotAllowedIntoTheApp);
      isUserNotAllowedIntoTheApp ? authStorage.removeToken() : setUser(user);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthLevelContext.Provider
        value={{
          modalType,
          setModalType,
          modalVisible,
          setModalVisible,
          email,
          setEmail,
          password,
          setPassword,
          user,
          setUser,
        }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </AuthLevelContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
