import { useState } from "react";
import "../styles/globals.css";
import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalType, setModalType] = useState("OTP");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLevelContext.Provider
      value={{
        modalType,
        modalVisible,
        setModalType,
        setModalVisible,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </AuthLevelContext.Provider>
  );
}

export default MyApp;
