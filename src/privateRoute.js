import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Pathname } from './pathname';


let accessToken = localStorage.getItem('_tid');


export const PrivateRoute = () => {
	const auth = accessToken;
	return auth ? <Outlet /> : <Navigate to={Pathname.LOGIN} />;
};

export default PrivateRoute;