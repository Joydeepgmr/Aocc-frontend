import React from 'react';
import './pageLoader.scss'; // Import the SCSS file

const PageLoader = ({ loading }) => {
	return loading ? (
		<div className="loader-overlay">
			<div className="loader"></div>
		</div>
	) : null;
};

export default PageLoader;
