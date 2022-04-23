import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContributionDetailsPage from '../pages/ContributionDetailsPage'
import ContributionEnrolmentPage from '../pages/ContributionEnrolmentPage'
import ContributionsPage from '../pages/ContributionsPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AdminHomePage from '../pages/admin/AdminHomePage'
import AdminContributionsPage from '../pages/admin/AdminContributionsPage'
import AdminAdhesionsPage from '../pages/admin/AdminAdhesionsPage'
import ProfilePage from '../pages/ProfilePage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'

const APP_ROUTES = [
    {
        path: '/',
        element: <HomePage />,
        exact: true
    },{
        path: '/login',
        element: <LoginPage />,
        exact: true
    },{
        path: '/register',
        element: <RegisterPage />,
        exact: true
    },{
        path: '/contributions',
        element: <ContributionsPage />,
        exact: true
    },{
        path: '/contributions/:id/details',
        element: <ContributionDetailsPage />,
        exact: true
    },{
        path: '/contributions/:id/new-member',
        element: <ContributionEnrolmentPage />,
        exact: true
    },
    {
        path: '/admin',
        element: <AdminHomePage />,
        exact: true
    },
    {
        path: '/admin/contributions',
        element: <AdminContributionsPage />,
        exact: true
    },
    {
        path: '/admin/contributions/:id/adhesions',
        element: <AdminAdhesionsPage />,
        exact: true
    },
    {
        path: '/profile',
        element: <ProfilePage />,
        exact: true
    }, 
    {
        path: '/admin/members',
        element: <AdminUsersPage />,
        exact: true
    },
]

function AppRoutes() {
  return (
        <Routes>
            {APP_ROUTES.map(({ path, element, exact }, i) => (
                <Route exact={exact} path={path} element={element} key={i} />))
            }
        </Routes>
  )
}

export default AppRoutes
