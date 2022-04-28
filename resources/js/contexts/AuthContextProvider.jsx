import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../services/auth";
import {checkIsAdmin} from "../services/usersServices"

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
    const [user, setLoggedUser] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const logout = React.useCallback((toast = true) => {
        auth.logout();
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        navigate("/login");
        if (toast) {
            toast.warn("Logout success!");
        }
    }, []);
    const setUser = React.useCallback((u) => {
        setLoggedUser(u);
        if(u)
            setIsAdmin(u.roles.find(r=>(r.name==='administrator'||r.name==='superadministrator'))!==undefined);
    }, [setLoggedUser]);
    React.useEffect(() => {
        axios.interceptors.response.use(undefined, (error) => {
            if (error.response && error.response.status === 401) {
                toast.error("You are not authorized!");
                logout();
                navigate("/login");
            }
            return Promise.reject(error);
        });
    }, []);
    React.useEffect(() => {
        if(isAuthenticated){
            (async () => {
            try {
                await auth.getUser().then(response => {
                    setUser(response.data);

                    const nextPathStr = localStorage.getItem('nextPath')
                    if(nextPathStr) {
                        const nextPath = JSON.parse(nextPathStr)
                            if((!!nextPath.meta.admin && checkIsAdmin(response.data))||!nextPath.meta.admin)
                                navigate(nextPath.path)
                        localStorage.removeItem("nextPath")
                    }
                });
            } catch (error) {
                console.log(error);
            }
        })()
        }
    }, [isAuthenticated]);
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
