import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) => supabase.auth.signInWithPassword({email, password});
const logout = () => supabase.auth.signOut(); 
const signup = (email, password, fullName) => supabase.auth.signUp({ 
  email, 
  password, 
  options: {
    data: {
      full_name: fullName
    }
}})


const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session != null ? data.session : null);
      setAuth(data.session != null ? true : false);
    }
    getSession();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setSession(session);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setSession(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, session, login, logout, signup }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;