import { Steps } from 'antd';
import React from 'react';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import './style.scss';

const MileStoneSteps = ({ title, data, startKey, endKey }) => {
	const startedAt = data?.[startKey];
	const endAt = data?.[endKey];
	return (
		<div className="utw--DataContainer">
			<span>{title}</span>
			<div className="stepsContainer">
				<div className="dotContainer">
					{/*start dot */}
					<div className={`${startedAt ? 'activeDot' : 'defaultDot'}`}></div>
					{/* border */}
					<div className={`${endAt ? 'activeBorder' : 'defaultBorder'}`}></div>
					{/*end dot */}
					<div className={`${endAt ? 'activeDot' : 'defaultDot'}`}></div>
				</div>
				<div className="timeContainer">
					<div className={`${startedAt ? 'activeTime' : 'defaultTime'}`}>
						<span>Start</span>
						<span>{startedAt ?? '-:-'}</span>
					</div>
					<div className={`${endAt ? 'activeTime' : 'defaultTime'}`}>
						<span>End</span>
						<span>{endAt ?? '-:-'}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
const VendorMileStone = ({ isUtwLoading, getUtwData, tab }) => {
	const customDot = (dot) => <div style={{ color: 'green' }}>{dot}</div>;
	return (
		<>
			{isUtwLoading && <PageLoader loading={isUtwLoading} />}

			<div className="utw--Container">
				<MileStoneSteps
					title="Catering"
					data={getUtwData?.data[0]}
					startKey="cateringStartAt"
					endKey="cateringStopAt"
				/>
				<MileStoneSteps
					title="Fueling"
					data={getUtwData?.data[0]}
					startKey="fuelingStartAt"
					endKey="fuelingStopAt"
				/>
				<MileStoneSteps
					title={`Baggage ${tab === 'arrival' ? 'Unloading' : 'Loading'}`}
					data={getUtwData?.data[0]}
					startKey={tab === 'arrival' ? 'baggageUnloadStartAt' : 'baggageLoadStartAt'}
					endKey={tab === 'arrival' ? 'baggageUnloadEndAt' : 'baggageLoadEndAt'}
				/>
				<MileStoneSteps
					title="Cleaning"
					data={getUtwData?.data[0]}
					startKey="cleaningStartAt"
					endKey="cleaningStopAt"
				/>
				{/* 
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
				</div> */}
			</div>
		</>
	);
};

export default VendorMileStone;
