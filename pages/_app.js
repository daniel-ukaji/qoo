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
import { GlobalProvider } from '../context/GlobalState'
import ProgressBar from "@badrap/bar-of-progress";
import { useRouter } from "next/router";
import { wrapper } from '../reduxstore/ ';

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 0,
})


// Router.events.on('routeChangeStart', progress.start)
// Router.events.on('routeChangeComplete', progress.finish)
// Router.events.on('routeChangeError', progress.finish)

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

  const router = useRouter();

        useEffect(() => {
          router.events.on("routeChangeStart", progress.start);
          router.events.on("routeChangeComplete", progress.finish);
          router.events.on("routeChangeError", progress.finish);

          return () => {
            router.events.off("routeChangeStart", progress.start);
            router.events.off("routeChangeComplete", progress.finish);
            router.events.off("routeChangeError", progress.finish);
          };
        }, [router]);
  

  return (
    
  <GlobalProvider>
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
    </GlobalProvider>
  );
}

export default MyApp;
