import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../Utils/useLocalStorage';


const AuthContext =  createContext();

export const AuthProvider = ({children, userData}) => {

    console.log("here 2222")

    const [user, setUser] = useLocalStorage("user", userData);

    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        navigate("/dashboard/home");
    }

    const logout = async () => {
        setUser(null);
        navigate("/");

    }

    const value = useMemo(
        () => ({
          user,
          login,
          logout
        }),
        [user]
      );

    return <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
