import React from 'react';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import './style.scss';
import { Steps } from 'antd';

const VendorMileStone = ({ isUtwLoading, getUtwData, tab }) => {
	const customDot = (dot) => dot;
	return (
		<>
			{isUtwLoading && <PageLoader loading={isUtwLoading} />}

			<div className="utw--Container">
				<div className="utw--DataContainer">
					<CustomTypography>Milestone</CustomTypography>
					<Steps
						style={{ width: '20rem' }}
						current={-1}
						progressDot={customDot}
						items={[
							{
								title: 'Start',
								description: '10:35',
							},
							{
								title: 'End',
								description: '11:20',
							},
						]}
					/>
					{/* <CustomTypography> Start</CustomTypography>
					<CustomTypography> End</CustomTypography> */}
				</div>
				<div className="utw--DataContainer">
					<CustomTypography fontWeight={400} fontSize="14px">
						Catering
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.cateringStartAt ?? '-'}
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.cateringStopAt ?? '-'}
					</CustomTypography>
				</div>

				<div className="utw--DataContainer">
					<CustomTypography fontWeight={400} fontSize="14px">
						Fueling
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.fuelingStartAt ?? '-'}
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.fuelingStopAt ?? '-'}
					</CustomTypography>
				</div>
				<div className="utw--DataContainer">
					<CustomTypography fontWeight={400} fontSize="14px">
						Baggage {tab === 'arrival' ? 'unloading' : 'loading'}
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{tab === 'arrival' && (getUtwData?.data[0]?.baggageUnloadStartAt ?? '-')}
						{tab === 'departure' && (getUtwData?.data[0]?.baggageLoadStartAt ?? '-')}
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{tab === 'arrival' && (getUtwData?.data[0]?.baggageUnloadEndAt ?? '-')}
						{tab === 'departure' && (getUtwData?.data[0]?.baggageLoadEndAt ?? '-')}
					</CustomTypography>
				</div>
				<div className="utw--DataContainer">
					<CustomTypography fontWeight={400} fontSize="14px">
						Cleaning
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.cleaningStartAt ?? '-'}
					</CustomTypography>
					<CustomTypography fontWeight={400} fontSize="14px">
						{getUtwData?.data[0]?.cleaningStopAt ?? '-'}
					</CustomTypography>
				</div>
			</div>
		</>
	);
};

export default VendorMileStone;
