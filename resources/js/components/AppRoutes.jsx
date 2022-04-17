import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContributionsPage from '../pages/ContributionsPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AdminHomePage from '../pages/admin/AdminHomePage'

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
    },
    {
        path: '/adminhome',
        element: <AdminHomePage />,
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
