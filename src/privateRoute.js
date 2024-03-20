import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Pathname } from './pathname';


const isAuthenticated = () => {
	// For example, check if a user token exists
	return localStorage.getItem('_tid') ? true : false;
};

export const PrivateOutlet = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to={Pathname.LOGIN} replace />;
};

export default PrivateOutlet;