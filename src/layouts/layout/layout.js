// Layout.js
import React, { useEffect } from 'react';
import PageLoader from '../../components/pageLoader/pageLoader';
import { useGetUserDetails } from '../../services/userLoginServices/LoginServices';
import TopNav from '../topNav/topNav';

const Layout = (props) => {
	const { data, isLoading, mutate: getUserDetails } = useGetUserDetails();
	useEffect(() => {
		getUserDetails();
	}, []);
	return (
		<>
			{isLoading ?
				<PageLoader loading={isLoading} />
				: <div>
					<TopNav data={data} />
					{data &&
						<div>
							{props.children}
						</div>
					}
				</div>
			}
		</>
	);
};

export default Layout;
