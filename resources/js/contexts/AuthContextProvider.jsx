import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../services/auth";

export const AuthContext = React.createContext({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: (v) => {},
    isAdmin: false,
    setIsAdmin: (v) => {},
    setUser: (u) => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(
        auth.isAuthenticated()
    );
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const logout = React.useCallback(() => {
        auth.logout();
        setIsAuthenticated(false);
        navigate("/login");
        toast.warn("Logout success!");
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                setIsAuthenticated,
                isAdmin,
                setIsAdmin,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
