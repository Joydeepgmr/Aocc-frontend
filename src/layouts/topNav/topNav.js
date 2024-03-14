import React, { useState } from 'react';
import gmrLogo from '../../assets/logo/gmr-logo.png';
import temperatureLogo from '../../assets/logo/sun.svg';
import windLogo from '../../assets/logo/wind.svg';
import setting from '../../assets/logo/setting.svg';
import bell from '../../assets/logo/bell.svg';
import user from '../../assets/logo/user.png';
import ellipse from '../../assets/logo/ellipse.svg';
import line from '../../assets/logo/line.svg';

import './topNav.scss';
import { navMenu, roleBasedNav } from './navData';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNav = () => {
	const [activeTab, setActiveTab] = useState(navMenu[0].key);
	const [isSettingCardOpen, setIsSettingCardOpen] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	console.log(pathname);
	const navItems = roleBasedNav(pathname);
	console.log(navItems);
	const handleTabClick = (key) => {
		setActiveTab(key); // Set the clicked tab as active
		navigate(navItems[key].children);
	};

	const toggleSettingCard = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
	};

	const logoutHandler = () => {
		localStorage.clear();
		// localStorage.setItem('_tid', '');
		// localStorage.setItem('role', '');
		navigate('/login');
		console.log('logged out', localStorage.getItem('_tid'));
	};

	const manageAccessHandler = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
		navigate('/user-access');
	};

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
								<div className={`tab ${activeTab === menu.key ? 'active' : ''}`}>{menu.label}</div>
								{activeTab === menu.key && <div className="active-line" />}
							</div>
						))}
					</div>
				</div>
				<div className="nav_right_section">
					<div className="weather_details">
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
					</div>
					<div className="vertical_separation">
						<img src={line}></img>
					</div>
					<div className="setting_bell">
						<img src={setting} onClick={toggleSettingCard} />
						<div>
							<img src={bell} />
							<img src={ellipse} className="ellipse" />
						</div>
					</div>
					<div className="user_info">
						<img src={user} />
						<div className="user_details">
							<p>Arjun Singh</p>
							<p>emailaddress@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
			{isSettingCardOpen && (
				<div className="setting_card">
					<p onClick={manageAccessHandler}>Manage Access</p>
					<div className="line"></div>
					<p onClick={logoutHandler}>Logout</p>
				</div>
			)}
		</>
	);
};

export default TopNav;
