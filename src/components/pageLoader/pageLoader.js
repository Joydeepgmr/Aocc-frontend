import React from 'react';
import './pageLoader.scss'; // Import the SCSS file

const PageLoader = ({ loading, message }) => {
	return loading ? (
		<div className="loader-overlay">
			<div className="loader"></div>
			{message && <div className="message">{message}</div>}
		</div>
	) : null;
};

export default PageLoader;
