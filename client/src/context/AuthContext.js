import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  // user: {
  //   _id: "637f6ec2e0d47a79a9edf4fc",
  //   username: "john",
  //   email: "john@gmail.com",
  //   profilePicture: "person/8.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   following: [],
  //   // following: ["637a22b1cf61ff1f745ef863", "63972a1b0e525f22d844a999"],
  //   isAdmin: false,
  // },
  // user: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
