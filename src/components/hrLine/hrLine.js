import React from 'react';

import './hrLine.scss';

const HrLine = (props) => {
	let { title } = props;

	return (
		<div className="HrLine">
			<hr className="HrLine--Length" />
			{title}
			<hr className="HrLine--Length" />
		</div>
	);
};

export default HrLine;
