// import React from "react"
// import { Route, Redirect, Navigate } from "react-router-dom"
// import { useAuth } from "./AuthContext"

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth()

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser ? <Component {...props} /> : <Navigate to="/login" />
//       }}
//     ></Route>
//   )
// }

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;