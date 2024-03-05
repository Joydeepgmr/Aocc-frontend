// Layout.js
import React from 'react';
import TopNav from '../topNav/topNav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div>
			<TopNav />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
