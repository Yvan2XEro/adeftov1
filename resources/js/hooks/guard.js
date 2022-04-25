import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContextProvider";
import trust from "../services/trust";

export function useGuards() {
    const { user } = React.useContext(AuthContext);
    const navigate = useNavigate("/");
    const adminGuard = React.useCallback(() => {
        alert(user.firstname);
        if (!trust.isAdmin(user) || !trust.isSuperAdmin(user)) {
            toast.error(
                "Vous n'avez pas les droits nécessaires pour accéder à cette page"
            );
            navigate("/");
        }
    }, [user]);

    return { adminGuard };
}
