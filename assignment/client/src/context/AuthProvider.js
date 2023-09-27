import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) => {

}

const logout = () => {

}

const signup = (email, password, fullName) => {

}


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getToken = async () => {

    }
    getToken();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setToken(session.access_token);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setToken(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, token, login, logout, signup }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;