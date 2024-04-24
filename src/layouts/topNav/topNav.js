import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as userType from "../../utils/roles";
import gmrLogo from '../../assets/logo/gmr-logo.png';
import temperatureLogo from '../../assets/logo/sun.svg';
import windLogo from '../../assets/logo/wind.svg';
import setting from '../../assets/logo/setting.svg';
import user from '../../assets/logo/user.png';
import line from '../../assets/logo/line.svg';
import { roleBasedNav } from './navData';
import './topNav.scss';


const TopNav = ({ data }) => {
	const [isSettingCardOpen, setIsSettingCardOpen] = useState(false);
	const [navItems, setNavItems] = useState([]);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleTabClick = (key) => {
		navigate(navItems[key].children);
	};

	const toggleSettingCard = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
	};

	const logoutHandler = () => {
		localStorage.clear();
		navigate('/login');
	};

	const manageAccessHandler = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
		navigate('/user-access');
	};
	useEffect(() => {
		const role = data?.role?.name;
		if (role) {
			const allNavItem = roleBasedNav(role);
			const selectedNavItem = allNavItem.find((data) => data.children === pathname);
			console.log('selected nav item', selectedNavItem);
			if (!selectedNavItem) {
				navigate('/404', { previousRoute: pathname });
			} else {
				setNavItems([...allNavItem]);
				navigate(selectedNavItem.children);
			}
		}
	}, [data]);

	return (
		<>
			<div className="nav_container">
				<div className="nav_left_section">
					<div className="gmr_logo">
						<img src={gmrLogo} alt="GMR Logo" />
					</div>
					<div className="tabs_container">
						{navItems.map((menu) => (
							<div key={menu.key} className="tab-wrapper" onClick={() => handleTabClick(menu.key)}>
								<div className={`tab ${pathname === menu.children ? 'active' : ''}`}>{menu.label}</div>
								{pathname === menu.children && <div className="active-line" />}
							</div>
						))}
					</div>
				</div>
				<div className="nav_right_section">
				{data?.role?.name !== userType.SECURITY_OFFICER && data?.role?.name !== userType.VENDOR && <div className="weather_details">
						<div className="temperature_details">
							<img src={temperatureLogo} />
							<div>
								<div>Sunny</div>
								<div>19*C</div>
							</div>
						</div>
						<div className="wind_details">
							<img src={windLogo} />
							<div>
								<div>Wind Speed</div>
								<div>85*3.7 kts</div>
							</div>
						</div>
					</div>}
					<div className="vertical_separation">
						<img src={line}></img>
					</div>
					<div className="setting_bell">
						<img src={setting} onClick={toggleSettingCard} />
						{/* <div>
						<img src={bell} />
						<img src={ellipse} className="ellipse" />
					</div> */}
					</div>
					<div className="user_info">
						<img src={user} />
						<div className="user_details">
							<p>{localStorage.getItem('name')}</p>
							<p>{localStorage.getItem('email')}</p>
						</div>
					</div>
				</div>
			</div>
			{isSettingCardOpen && (
				<>
				<div className="setting_card--BackDrop" onClick={() => setIsSettingCardOpen(false)}></div>
				<div className="setting_card">
					{localStorage.getItem('name') === 'Planner' && <p onClick={manageAccessHandler}>Manage Access</p>}
					<div className="line"></div>
					<p onClick={logoutHandler}>Logout</p>
				</div>
				</>
			)}
		</>
	);
};

export default TopNav;
