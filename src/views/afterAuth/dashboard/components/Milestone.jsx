import React, { useEffect, useMemo, useState } from 'react';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import MilestoneChart from './MilestoneChart';
import './style.scss';
import { useGetMileStoneData } from '../../../../services/dashboard/milestones/milestones';
import PageLoader from '../../../../components/pageLoader/pageLoader';

const MilestoneTabData = ({ type }) => {
	const { data, isLoading, hasNextPage, fetchNextPage } = useGetMileStoneData({ flightType: type });
	const [milestoneData, setMilestoneData] = useState([]);
	const [labels, setLabels] = useState([]);
	useEffect(() => {
		if (data?.pages) {
			const lastPage = data.pages.length >= 1 ? data.pages[data.pages.length - 1] : [];
			setMilestoneData([...milestoneData, ...lastPage.data.milestoneList]);
			if (!labels.length) {
				const labels = lastPage.data.milestones.map((milestone) => Object.values(milestone)[0]);
				setLabels([...labels]);
			}
		}
	}, [data]);
	return (
		<>
			{isLoading ? (
				<PageLoader loading={isLoading} />
			) : (
				<MilestoneChart data={milestoneData} {...{ hasNextPage, fetchNextPage, type, labels }} />
			)}
		</>
	);
};
function Milestone() {
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: <MilestoneTabData type={'arrival'} />,
		},
		{
			key: '2',
			label: 'Departure',
			children: <MilestoneTabData type={'departure'} />,
		},
	];

	const handleChange = () => {
		console.log('Tab switch');
	};
	return (
		<div className="body-container">
			<div className="top-bar">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={'Milestones'} />
				<div className="filter-section">
					<InputField
						label="Airport Name"
						name="search"
						placeholder="Search"
						warning="Required field"
						type="search"
					/>
				</div>
			</div>
			<div className="flights-table">
				<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			</div>
		</div>
	);
}

export default Milestone;
