// Layout.js
import React, { useEffect } from 'react';
import PageLoader from '../../components/pageLoader/pageLoader';
import { useGetUserDetails, useGetWeatherDetails } from '../../services/userLoginServices/LoginServices';
import TopNav from '../topNav/topNav';

const Layout = (props) => {
	const { data, isLoading, mutate: getUserDetails } = useGetUserDetails();
	const { data: weatherData, mutate: getWeatherData } = useGetWeatherDetails();
	useEffect(() => {
		getUserDetails();
		getWeatherData();
	}, []);
	return (
		<>
			{isLoading ?
				<PageLoader loading={isLoading} />
				: <div>
					<TopNav data={data} weatherData={weatherData} />
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
