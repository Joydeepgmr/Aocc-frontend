import React from 'react';
import CustomTypography from '../typographyComponent/typographyComponent';
import InputField from '../input/field/field';
import filterIcon from '../../assets/logo/filter-icon.svg';
import './topHeader.scss';

const TopHeader = ({ heading, subHeading, className, searchBox, condition, children }) => {
	return (
		<>
			<div className={`top_header_container ${className}`}>
				<div>
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" lineheight="3.36rem">
						{heading}
					</CustomTypography>
					<CustomTypography
						type="paragraph"
						fontSize={14}
						fontWeight="400"
						color="#909296"
						lineheight="3.36rem"
					>
						{subHeading}
					</CustomTypography>
				</div>
				{condition ? (
					<div className="filter_search_container">
						<div className="filter-icon">
							<img src={filterIcon} />
						</div>
						<div>
							<InputField type="search" name="search" placeholder="Search" className="custom_input1" />
						</div>
					</div>
				) : (
					''
				)}
				<div className="filter_search_container">{children}</div>
			</div>
		</>
	);
};

export default TopHeader;
