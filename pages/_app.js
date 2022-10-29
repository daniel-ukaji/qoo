import { useState } from "react";
import "../styles/globals.css";
import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("NONE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  return (
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
      <Component {...pageProps} />
      <ToastContainer />
    </AuthLevelContext.Provider>
  );
}

export default MyApp;
