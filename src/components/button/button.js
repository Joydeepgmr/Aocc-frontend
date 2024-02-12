import React from 'react';
import { Circles } from 'react-loader-spinner';
import PropTypes from 'prop-types';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './button.scss';

const Button = (props) => {
	let { title, type, loading } = props;
	return type === 'action' ? (
		<button className="ActionButton" style={{ ...props.style }} {...props}>
			{loading ? <Circles color="#fff" height={20} className="ActionButton--Loader" width="auto" /> : title}
		</button>
	) : (
		<button
			className="Button"
			onClick={() => {
				if (window.gtag) {
					window.gtag('event', 'conversion', {
						send_to: 'AW-10805417658/5_05CNy6pYMDELqttqAo',
					});
				}
			}}
			{...props}
		>
			{title}
		</button>
	);
};

Button.prototype = {
	title: PropTypes.string,
	type: PropTypes.string,
	loading: PropTypes.bool,
};

export default React.memo(Button);
