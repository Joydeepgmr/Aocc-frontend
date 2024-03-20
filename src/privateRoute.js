import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Pathname } from './pathname';


let isAuthenticated = () => localStorage.getItem('_tid') ? true : false;

export const PrivateRoute = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to={Pathname.LOGIN} replace />;
};

export default PrivateRoute;