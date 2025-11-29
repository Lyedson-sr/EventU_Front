import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    access: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("access");

    if (storedUser && storedAccess) {
      setAuth({
        user: JSON.parse(storedUser),
        access: storedAccess,
      });
    }

    setLoading(false); 
  }, []);

  useEffect(() => {
    if (auth.user && auth.access) {
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem("access", auth.access);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
