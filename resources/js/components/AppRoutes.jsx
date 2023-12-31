import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ContributionDetailsPage from "../pages/ContributionDetailsPage";
import ContributionEnrolmentPage from "../pages/ContributionEnrolmentPage";
import ContributionsPage from "../pages/ContributionsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminContributionsPage from "../pages/admin/AdminContributionsPage";
import ProfilePage from "../pages/ProfilePage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import { AuthContext } from "../contexts/AuthContextProvider";
import AdminStatPage from "../pages/admin/AdminStatPage"
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import MyAccountPage from "../pages/MyAccountPage";

const APP_ROUTES = [
    {
        path: "/",
        element: <HomePage />,
        exact: true,
        meta: {
            auth: undefined,
        },
    },
    {
        path: "/login",
        element: <LoginPage />,
        exact: true,
        meta: {
            auth: false,
        },
    },
    {
        path: "/register",
        element: <RegisterPage />,
        exact: true,
        meta: {
            auth: false,
        },
    },
    {
        path: "/contributions",
        element: <ContributionsPage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/contributions/:id/details",
        element: <ContributionDetailsPage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/contributions/:id/new-member",
        element: <ContributionEnrolmentPage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/admin",
        element: <AdminHomePage />,
        exact: true,
        meta: {
            auth: true,
            admin: true,
        },
    },
    {
        path: "/admin/contributions",
        element: <AdminContributionsPage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/profile",
        element: <ProfilePage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/my-account",
        element: <MyAccountPage />,
        exact: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/admin/statistics",
        element: <AdminStatPage />,
        exact: true,
        meta: {
            auth: true,
            admin: true
        },
    },
    {
        path: "/admin/users",
        element: <AdminUsersPage />,
        exact: true,
        meta: {
            auth: true,
            admin: true
        },
    },
    {
        path: "/admin/users/:id",
        element: <AdminUserDetails />,
        exact: true,
        meta: {
            auth: true,
            admin: true
        },
    },
];

function AppRoutes() {
    return (
        <Routes>
            {APP_ROUTES.map(({ path, element, exact, meta }, i) => (
                <Route
                    exact={exact}
                    path={path}
                    element={<GuardRoute meta={meta}>{element}</GuardRoute>}
                    key={i}
                />
            ))}
        </Routes>
    );
}

export default AppRoutes;

const GuardRoute = ({ children, meta }) => {
    const { isAuthenticated, isAdmin, user } = React.useContext(AuthContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        const path = window.location.hash.substring(1, window.location.hash.length)
        const route = JSON.stringify({ path, meta})
        if (meta.auth === false && isAuthenticated) {
            navigate("/");
        }
        if (meta.auth === true && !isAuthenticated) {
            localStorage.setItem("nextPath", route)
            navigate("/login");
        }
        if (meta.admin === true && !isAdmin) {
            const p = localStorage.getItem("nextPath")
            if(!p)
                localStorage.setItem("nextPath",route)
            navigate("/");
        }
    }, [isAuthenticated, isAdmin, navigate,user, meta]);
    return children;
};
