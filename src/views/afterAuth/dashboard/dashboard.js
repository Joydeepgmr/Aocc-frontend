import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import { setUserName } from './Redux/action'; "./Redux/action"
import HrLine from '../../../components/hrLine/hrLine';
// import Button from "../../../components/Button/Button";
import { Pathname } from '../../../pathname';

import { setUserName } from './redux/reducer';
import { UsersFetchAction } from './redux/actionCreator';

import './dashboard.scss';

export const Dashboard = () => {
	const dispatch = useDispatch();
	const dashboard = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(setUserName('Shank'));

		// Dummy API Call
		dispatch(UsersFetchAction());
	}, []);

	return (
		<React.Fragment>
			<div className="Dashboard">
				<div className="Dashboard--Logo"></div>
				<Link to={Pathname.DASHBOARD_ORDERS}>
					<div className="Dashboard--Absolute">Dasboard Orders</div>
				</Link>
				<div className="Dashboard--Home">
					<div className="Dashboard--HomeTop">
						<div className="Dashboard--HomeTopLeft">
							<h1 className="Dashboard--HomeTopLeftTitle">
								<img src={''} className="Dashboard--HomeEmoji" />
								{dashboard.user_name && dashboard.user_name} User
							</h1>
							<h1 className="Dashboard--HomeTopLeftSubTitle">
								Congratulations you’re in the queue to get this product 💳
							</h1>
							<div className="Dashboard--HomeTopLeftStats">
								<div className="Dashboard--HomeTopLeftStatsDiv">
									<p className="Dashboard--Para">Your Position</p>
									<h1 className="Dashboard--Title Dashboard--TitleOrange">10</h1>
								</div>
								<div className="Dashboard--HomeTopLeftStatsRow">
									<div className="Dashboard--HomeTopLeftStatsDiv">
										<p className="Dashboard--Para">Total in waitlist</p>
										<h1 className="Dashboard--Title">0</h1>
									</div>
									<div className="Dashboard--HomeTopLeftStatsDiv">
										<p className="Dashboard--Para">Successful referrals</p>
									</div>
								</div>
							</div>
						</div>
						<div className="Dashboard--HomeTopRight">
							<div className="Dashboard--HomeTopRightContent">
								<h1 className="Dashboard--SubTitle">Want access sooner?</h1>
								<p className="Dashboard--Para Dashboard--ParaRubik">
									Move up by <span className="Dashboard--ParaSpan">1000</span> spots for every person
									that joins the waitlist using your link.
								</p>
								<div className="Dashboard--HomeTopRightContentActions">
									<div className="Dashboard--HomeTopRightContentActionsLink" style={{ width: '' }}>
										https://www.antino.io
									</div>
								</div>
							</div>
							<HrLine title="OR" />
							<div className="Dashboard--HomeTopRightContent">
								<h1 className="Dashboard--SubTitle">
									<img className="Dashboard--SubTitleEmoji" /> Lazy to share?
								</h1>
								<p className="Dashboard--Para Dashboard--ParaRubik">Skip waitlist.</p>
							</div>
							{/*<Button
								title="Skip for ₹49"
								type="action"
								style={{
									opacity: '1',
									width: '45%',
									borderRadius: '5rem',
									fontFamily: "'Rubik', sans-serif",
									padding: '1rem 0'
								}}
								onClick={""}
							/>*/}
						</div>
					</div>
					<a
						href={''}
						rel="noreferrer"
						target="_blank"
						className={`Dashboard--HomeBottom`}
						style={{
							cursor: 'pointer',
						}}
					>
						<img src={''} alt="influence" className="Dashboard--HomeBottomPic" />
						<div
							className="Dashboard--HomeBottomContent"
							style={{
								width: 'auto',
							}}
						>
							<h1 className="Dashboard--HomeBottomContentTitle">#Zone</h1>
							<p className="Dashboard--HomeBottomContentPara" style={{}}>
								'Your request is in review. We will notify you shortly!'
							</p>
						</div>
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
