import React, { useState, useEffect } from 'react';
import loginPageImage from '../../../assets/login_page_image.png';
import gmrLogo from '../../../assets/logo/gmr-logo.png';
import InputField from '../../../components/input/field/field';
import CheckboxField from '../../../components/checkbox/checkbox';
import { Form, Image } from 'antd';
import ButtonComponent from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Pathname } from '../../../pathname';
import { useGetUserDetails, useLoginUser } from '../../../services/userLoginServices/LoginServices';
import * as userType from '../../../utils/roles';

import './login.scss';
import toast from 'react-hot-toast';
import PageLoader from '../../../components/pageLoader/pageLoader';
import { roleBasedNav } from '../../../layouts/topNav/navData';

export const Login = () => {
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance
	const imageUrl = [{ name: 'GMR Hyderbad International Airport, Hyderabad, India', url: loginPageImage, key: 1 }];
	const [nextImage, setNextTime] = useState(0);
	const navigate = useNavigate();
	const loginApiProps = {
		onSuccess: ({ data }) => {
			localStorage.setItem('_tid', data?.accessToken);
			localStorage.setItem('name', data?.roleName);
			localStorage.setItem('email', data?.email);
			roleRedirectFlow(data.roleName);
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => toast.error(message),
	};
	const { mutate: loginUser } = useLoginUser(loginApiProps);
	const { data, isLoading, mutate: getUserDetails } = useGetUserDetails();
	const handleChangeLoginPageImage = () => {
		setNextTime(nextImage % imageUrl);
	};

	const roleRedirectFlow = (role) => {
		switch (role) {
			case userType.IT_ADMIN:
				navigate(Pathname.GLOBALMASTERS);
				break;
			case userType.PLANNER:
				navigate(Pathname.DASHBOARD);
				break;
			case userType.VENDOR:
				navigate(Pathname.DASHBOARD);
				break;
			case userType.ACCESS_MANAGER:
				navigate(Pathname.DASHBOARD);
				break;
			case userType.SECURITY_OFFICER:
				navigate(Pathname.SECURITY_OFFICER);
				break;

			case userType.CDM:
				navigate(Pathname.CDM);
				break;
			default:
				navigate(Pathname[404]);
				break;
		}
	};

	const onFinishHandler = (values) => {
		loginUser(values);
	};

	useEffect(() => {
		if (localStorage.getItem('_tid')) {
			console.log(localStorage.getItem('_tid'));
			getUserDetails();
		}
	}, []);

	useEffect(() => {
		const role = data?.role?.name;
		if (role) {
			const allNavItem = roleBasedNav(role);
			if (allNavItem?.length) {
				navigate(allNavItem[0].children);
			}
		}
	}, [data]);

	return isLoading ? (
		<PageLoader loading={isLoading} />
	) : (
		<div className="login_page">
			<div className="login_container">
				<div className="login_content_container">
					<div className="gmr_logo">
						<Image src={gmrLogo} alt="GMR Logo" preview={false} />
					</div>
					<div className="content_wrapper">
						<div className="login_welcome_heading">
							<h1>Welcome Back</h1>
							<p>Enter your email and password to access your account</p>
						</div>
						<div className="login_input_fields">
							<Form form={form} layout="vertical" onFinish={onFinishHandler}>
								<div className="login_form_fields">
									<InputField
										label="Email"
										name="email"
										required
										isArticle={false}
										placeholder="Enter your email"
										className="custom_input"
									/>
									<InputField
										label="Password"
										name="password"
										type="password"
										isArticle={false}
										required
										placeholder="Enter your password"
										className="custom_input"
									/>
								</div>
								{/* <CheckboxField name="remember" label="Remember me" /> */}
								<ButtonComponent
									title="Sign In"
									isSubmit="submit"
									className="submit_button"
									type="filledText"
								/>
								<p className="contact-admin">
									Need help? <a className="admin-link">Contact admin</a>
								</p>
							</Form>
						</div>
					</div>
				</div>
			</div>

			<div className="image_container">
				<img className="login_image" src={imageUrl[nextImage].url} alt="airport image" />
				<div className="change_login_page_image">
					<p>{imageUrl[nextImage].name}</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
