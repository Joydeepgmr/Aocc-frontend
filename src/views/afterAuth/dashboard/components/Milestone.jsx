import React, { useEffect, useMemo, useState } from 'react';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import MilestoneChart from './MilestoneChart';
import './style.scss';
import { useGetMileStoneData } from '../../../../services/dashboard/milestones/milestones';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import { GET_MILESTONE_DATA } from '../../../../api';
import SocketEventListener from '../../../../socket/listner/socketListner';

function Milestone() {
	const [type, setType] = useState('arrival');
	const [milestoneData, setMilestoneData] = useState([]);
	const [labels, setLabels] = useState([]);
	const onSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data.milestoneList || []);
			}, []);
			setMilestoneData([...newData]);
			if (!labels.length && data?.pages?.length) {
				const labels = data?.pages[0].data.milestones.map((milestoneObj) => {
					const [key] = Object.keys(milestoneObj);
					const value = milestoneObj[key];
					return { key: key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), value };
				});
				setLabels([...labels]);
			}
		}
	};
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useGetMileStoneData({
		flightType: type,
		onSuccess,
		onError,
	});
	const handleTabChange = (key) => {
		if (key == '1') {
			setType('arrival');
		} else {
			setType('departure');
		}
		setMilestoneData([]);
		setLabels([]);
	};
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<>
					{isLoading ? (
						<PageLoader loading={isLoading} />
					) : (
						<MilestoneChart data={milestoneData} {...{ hasNextPage, fetchNextPage, type, labels }} />
					)}
				</>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<>
					{isLoading ? (
						<PageLoader loading={isLoading} />
					) : (
						<MilestoneChart data={milestoneData} {...{ hasNextPage, fetchNextPage, type, labels }} />
					)}
				</>
			),
		},
	];
	return (
		<>
			<SocketEventListener refetch={refetch} apiName={`${GET_MILESTONE_DATA}?flightType=${type}`} />
			<div className="body-container">
				<div className="top-bar">
					<CustomTypography
						type="title"
						fontSize={24}
						fontWeight="600"
						color="black"
						children={'Milestones'}
					/>
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
					<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
				</div>
			</div>
		</>
	);
}

export default Milestone;
