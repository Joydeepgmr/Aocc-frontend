import React, { useState } from 'react';
import loginPageImage from '../../../assets/login_page_image.png';
import gmrLogo from '../../../assets/logo/gmr-logo.png';
import InputField from '../../../components/input/field/field';
import CheckboxField from '../../../components/checkbox/checkbox';
import { Form, Image } from 'antd';
import ButtonComponent from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Pathname } from '../../../pathname';
import { checkAuth } from './dummy-user';
import { useLoginUser } from '../../../services/userLoginServices/LoginServices';

import './login.scss';

export const Login = () => {
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance
	const imageUrl = [{ name: 'GMR Hyderbad International Aiport, Hyderabad, India', url: loginPageImage, key: 1 }];
	const [nextImage, setNextTime] = useState(0);
	const navigate = useNavigate();
	const { mutate: loginUser } = useLoginUser();
	const handleChangeLoginPageImage = () => {
		setNextTime(nextImage % imageUrl);
	};

	const onFinishHandler = (values) => {
		if (values.email && values.password) {
			loginUser(values, {
                onSuccess: (data) => { 
						console.log("What is Data after login", data);
						localStorage.setItem('_tid', data?.data?.accessToken)
						localStorage.setItem('role', data?.data?.roleName.toLowerCase());
		
						let role = data?.data?.roleName.toLowerCase();
						console.log("what is role",role);
						switch (role) {
							case 'it admin':
								navigate(Pathname.GLOBALMASTERS);
								break;
							case 'planner':
								navigate(Pathname.DASHBOARD);
								break;
							case 'vendor':
								navigate(Pathname.DASHBOARD);
								break;
							case 'accessmanager':
								navigate(Pathname.DASHBOARD);
								break;
							default:
								navigate(Pathname.DASHBOARD);
								break;
						}
					
                },
                onError: (error) => {
                    console.error('Login error:', error);
                    alert("Login failed. Please check your credentials.");
                }
            });
		} else {
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
