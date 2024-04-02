// Layout.js
import React from 'react';
import TopNav from '../topNav/topNav';
import { Outlet } from 'react-router-dom';

const Layout = (props) => {
	return (
		<div>
			<TopNav />
			<div>
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
