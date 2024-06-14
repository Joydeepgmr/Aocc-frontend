import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import gmrLogo from '../../assets/logo/gmr-logo.svg';
import line from '../../assets/logo/line.svg';
import setting from '../../assets/logo/setting.svg';
import windLogo from '../../assets/logo/wind.svg';
import temperatureLogo from '../../assets/logo/sun.svg';
import CustomTypography from '../../components/typographyComponent/typographyComponent';
import { localStorageKey } from '../../keys';
import { Pathname } from '../../pathname';
import * as userType from '../../utils/roles';
import Alerts from '../alerts/Alerts';
import { roleBasedNav } from './navData';
import './topNav.scss';
import Modal from '../../components/modal/modal';
import InputField from '../../components/input/field/field';
import { Form } from 'antd';
import ButtonComponent from '../../components/button/button';

const TopNav = ({ data, weatherData }) => {
	const queryClient = useQueryClient();
	const logo = localStorage.getItem(localStorageKey.LOGO);
	const [isSettingCardOpen, setIsSettingCardOpen] = useState(false);
	const [restedModal, setRestedModal] = useState(false);
	const [navItems, setNavItems] = useState([]);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [resetForm] = Form.useForm();
	const writeAccess = !!localStorage.getItem('subUserAccess');

	const handleTabClick = (key) => {
		navigate(navItems[key].children);
	};

	const toggleSettingCard = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
	};

	const handleResetModalOpen = () => {
		setRestedModal(true);
		toggleSettingCard();
	}
	const handleResetModalClose = () => {
		setRestedModal(false);
	}
	const logoutHandler = () => {
		queryClient.clear();
		localStorage.clear();
		navigate(Pathname.LOGIN);
	};

	const manageAccessHandler = () => {
		setIsSettingCardOpen(!isSettingCardOpen);
		navigate(Pathname.USERACCESS);
	};
	useEffect(() => {
		const role = data?.role?.name;
		if (role) {
			const allNavItem = roleBasedNav(role);
			const selectedNavItem = allNavItem.find((data) => data.children === pathname);
			if (!selectedNavItem) {
				if (pathname === Pathname.USERACCESS && role === userType.PLANNER) {
					navigate(Pathname?.USERACCESS);
					setNavItems([...allNavItem]);
				} else {
					navigate('/404', { previousRoute: pathname });
				}
			} else {
				setNavItems([...allNavItem]);
				navigate(selectedNavItem?.children);
			}
		}
	}, [data]);

	return (
		<>
			<Modal width='30vw' isModalOpen={restedModal} closeModal={handleResetModalClose} title='Reset Password'>
				<Form layout='vertical' form={resetForm}>
					<InputField
						label='Old Password'
						name="oldPassword"
						isArticle={false}
						placeholder="Enter Old Password"
						required
						warning="Required field"
						className="custom_input"
					/>
					<InputField
						label='New Password'
						name="newPassword"
						isArticle={false}
						placeholder="Enter New Password"
						required
						warning="Required field"
						className="custom_input"
					/>
					<InputField
						label='Confirm Password'
						name="confirmPassword"
						type="password"
						isArticle={false}
						required
						placeholder="Enter Confirm new password"
						className="custom_input"
					/>
					<div style={{ marginTop: '1rem' }} className="user_form_inputfields">
						<div className="form_bottomButton">
							<ButtonComponent
								title="Cancel"
								type="filledText"
								className="custom_button_cancel"
								onClick={handleResetModalClose}
							/>
							<ButtonComponent
								title="Reset"
								type="filledText"
								className="custom_button_save"
								isSubmit={true}
							/>
						</div>
					</div>
				</Form>
			</Modal>
			<div className="nav_container">
				<div className="nav_left_section">
					<div className="gmr_logo">
						{logo ? (
							<>
								<img className='logo' src={logo} alt="GMR Logo" />
							</>
						) : (
							<img src={gmrLogo} alt="GMR Logo" />
						)}
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
					{(data?.role?.name === userType.PLANNER || data?.role?.name === userType.CDM) && (
						<div className="weather_details">
							<div className="temperature_details">
								<img src={weatherData?.current?.condition?.icon ?? temperatureLogo} />
								<div>
									<div>{weatherData?.current?.condition?.text}</div>
									<div>{weatherData?.current?.temp_c}*C</div>
								</div>
							</div>
							<div className="wind_details">
								<img src={windLogo} />
								<div>
									<div>Wind Speed</div>
									<div>{weatherData?.current?.wind_mph} mph</div>
								</div>
							</div>
						</div>
					)}
					<div className="vertical_separation">
						<img src={line}></img>
					</div>
					<div className="setting_bell">
						<div className='setting_icon'>
							<img src={setting} onClick={toggleSettingCard} />
							{isSettingCardOpen && (
								<div className='setting_card'>
									<div className="setting_card--BackDrop" onClick={() => setIsSettingCardOpen(false)}></div>
									<div className="setting_card">
										{localStorage.getItem('name') === 'Planner' && writeAccess ? (
											<p onClick={manageAccessHandler}>Manage Access</p>
										) : null}
										<p onClick={handleResetModalOpen}>Reset Password</p>
										<p onClick={logoutHandler}>Logout</p>
									</div>
								</div>
							)}
						</div>
						{data?.role?.name === userType.PLANNER && (
							<div>
								<Alerts />
							</div>
						)}
					</div>
					<div className="user_info">
						{/* <img src={user} /> */}
						<UserOutlined className="user_avatar" />
						<div className="user_details">
							<p>{localStorage.getItem('name')}</p>
							<p>{localStorage.getItem('email')}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopNav;
