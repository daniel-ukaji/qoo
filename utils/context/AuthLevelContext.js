import { createContext } from "react";

export const AuthLevelContext = createContext({
  modalVisible: false,
  setModalVisible: (state) => state,
  modalType: "NONE",
  setModalType: (type) => type,
  email: "",
  setEmail: (email) => email,
  password: "",
  setPassword: (password) => password,
});
