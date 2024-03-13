import React, { useState } from 'react';
import './login.scss';
import loginPageImage from '../../../assets/login_page_image.png';
import gmrLogo from '../../../assets/logo/gmr-logo.png';
import InputField from '../../../components/inputField/inputField';
import CheckboxField from '../../../components/checkBoxField/checkBoxField';
import { Form, Image } from 'antd';
import ButtonComponent from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Pathname } from '../../../pathname';

export const Login = () => {
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance
	const imageUrl = [{ name: 'GMR Hyderbad International Aiport, Hyderabad, India', url: loginPageImage, key: 1 }];
	const [nextImage, setNextTime] = useState(0);
	const navigate = useNavigate();
	const handleChangeLoginPageImage = () => {
		setNextTime(nextImage % imageUrl);
	};

	const onFinishHandler = (values) => {
		console.log("what are the values in login",values?.email);
		// Assuming your API response contains a token
		const t_id = 'your_generated_token'; // Replace this with your actual token
		let role;
		let route;
        const email = values?.email?.toLowerCase(); // Convert email to lowercase for case insensitivity

        switch (email) {
        	case 'admin@test.com':
            	role = 'ADMIN';
            	break;
        	case 'planner@test.com':
            	role = 'PLANNER';
            	break;
        	case 'vendor@test.com':
            	role = 'VENDOR';
            	break;
        	case 'access@test.com':
            	role = 'ACCESSMANAGER';
            	break;
        	default:
            	role = ''; // Default token if email doesn't match any specific case
            	break;
    	}

		// Store the token in local storage
		localStorage.setItem('t_id', t_id);
		localStorage.setItem('role', role);
		let accessToken = localStorage.getItem('t_id');
		// Redirect to the dashboard path
		if (accessToken) {
			switch (role) {
				case 'ADMIN':
					navigate(Pathname.GLOBALMASTERS);
					break;
				case 'PLANNER':
					navigate(Pathname.DASHBOARD);
					break;
				case 'VENDOR':
					navigate(Pathname.DASHBOARD);
					break;
				case 'ACCESSMANAGER':
					navigate(Pathname.DASHBOARD);
					break;
				default:
					navigate(Pathname.DASHBOARD);
					break;
			}
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
