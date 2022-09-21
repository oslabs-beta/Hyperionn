import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = null; 
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;