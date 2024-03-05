import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from './redux/reducer';
import { UsersFetchAction } from './redux/actionCreator';
import './dashboard.scss';


export const Dashboard = () => {
	const dispatch = useDispatch();
	const dashboard = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(setUserName('Shank'));
		dispatch(UsersFetchAction());
	}, []);

	return (
		<React.Fragment>
			<h1>Dashboard</h1>
		</React.Fragment>
	);
};

export default Dashboard;
