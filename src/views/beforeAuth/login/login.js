import React, { useState, useEffect } from 'react';
import loginPageImage from '../../../assets/login_page_image.png';
import gmrLogo from '../../../assets/logo/gmr-logo.png';
import InputField from '../../../components/input/field/field';
import CheckboxField from '../../../components/checkbox/checkbox';
import { Form, Image } from 'antd';
import ButtonComponent from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Pathname } from '../../../pathname';
import { useLoginUser } from '../../../services/userLoginServices/LoginServices';
import * as userType from "../../../utils/roles";

import './login.scss';

export const Login = () => {
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance
	const imageUrl = [{ name: 'GMR Hyderbad International Airport, Hyderabad, India', url: loginPageImage, key: 1 }];
	const [nextImage, setNextTime] = useState(0);
	const navigate = useNavigate();
	const { mutate: loginUser } = useLoginUser();
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
			default:
				navigate(Pathname.DASHBOARD);
				break;
		}
	}

	useEffect(() => {
		if (localStorage.getItem("_tid") && localStorage.getItem("role")) {
			roleRedirectFlow(localStorage.getItem("role"))
		}
	}, [])

	const onFinishHandler = (values) => {
		if (values.email && values.password) {
			loginUser(values, {
				onSuccess: async (data) => {
					console.log("What is Data after login", data);
					const role = data.data.roleName.toLowerCase();

					localStorage.setItem('_tid', data?.data?.accessToken)
					localStorage.setItem('role', role);
					localStorage.setItem('name', data?.data?.name)
					localStorage.setItem('email', data?.data?.email)
					if (role === 'admin') { localStorage.setItem('permission', JSON.stringify(permission.admin)) }
					else if (role === 'planner') { localStorage.setItem('permission', JSON.stringify(permission.planner)) }

					roleRedirectFlow(role);
				},
				onError: (error) => {
					console.error('Login error:', error);
					alert("Login failed. Please check your credentials.");
				}
			});
		}
		else {
			alert("Please fill out all fields");
		}
	};

	return (
		<>
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
									<InputField
										label="Email"
										name="email"
										placeholder="Enter your email"
										className="custom_input"
									/>
									<InputField
										label="Password"
										name="password"
										type="password"
										placeholder="Enter your password"
										className="custom_input"
									/>
									<CheckboxField name="remember" label="Remember me" />
									<ButtonComponent
										title="Sign In"
										isSubmit="submit"
										className="submit_button"
										type="filledText"
									/>
									<p className="contact-admin">Need help? <a className='admin-link'>Contact admin</a></p>
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
		</>
	);
};

export default Login;
