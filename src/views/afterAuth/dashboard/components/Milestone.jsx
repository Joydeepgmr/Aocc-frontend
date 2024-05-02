import React, { useRef, useState } from 'react';
import { GET_MILESTONE_DATA } from '../../../../api';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { useGetMileStoneData } from '../../../../services/dashboard/milestones/milestones';
import SocketEventListener from '../../../../socket/listner/socketListner';
import MilestoneChart from './MilestoneChart';
import { toast } from 'react-hot-toast';
import './style.scss';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import Widgets from './Widgets';
import Alerts from './Alerts';

function Milestone() {
	const [type, setType] = useState('arrival');
	const [milestoneData, setMilestoneData] = useState([]);
	const [labels, setLabels] = useState([]);
	const divRef = useRef(null);
	const [fullScreen, setFullScreen] = useState(false);
	const onSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data.milestoneList || []);
			}, []);
			setMilestoneData([...newData, ...newData, ...newData]);
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
	}) => {
		toast.dismiss();
		toast.error(message);
	};
	const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetMileStoneData({
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
	const toggleFullscreen = () => {
		setFullScreen(!fullScreen);
		if (document.fullscreenElement === null) {
			if (divRef.current?.requestFullscreen) {
				divRef.current.requestFullscreen();
			} else if (divRef.current?.mozRequestFullScreen) {
				divRef.current.mozRequestFullScreen();
			} else if (divRef.current?.webkitRequestFullscreen) {
				divRef.current.webkitRequestFullscreen();
			} else if (divRef.current?.msRequestFullscreen) {
				divRef.current.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document?.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document?.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document?.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	};
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<>
					<PageLoader loading={isFetching} />
					<MilestoneChart
						fullScreen={fullScreen}
						data={milestoneData}
						{...{ hasNextPage, fetchNextPage, type, labels }}
					/>
				</>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<>
					<PageLoader loading={isFetching} />
					<MilestoneChart
						fullScreen={fullScreen}
						data={milestoneData}
						{...{ hasNextPage, fetchNextPage, type, labels }}
					/>
				</>
			),
		},
	];
	return (
		<>
			<SocketEventListener refetch={refetch} apiName={`${GET_MILESTONE_DATA}?flightType=${type}`} />

			<div className={`body-containers ${fullScreen && 'fullScreen--FullScreen'}`} ref={divRef}>
				<div className={`top-bar`}>
					<CustomTypography
						type="title"
						fontSize={24}
						fontWeight="600"
						color="black"
						children={'Milestones'}
					/>
					<div className={`filter-section ${fullScreen && 'fullScreen--FullScreenFilter'}`}>
						{fullScreen ? (
							<FullscreenExitOutlined
								className="fullScreen--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
						) : (
							<FullscreenOutlined onClick={toggleFullscreen} className="fullScreen--FullScreenIcon" />
						)}
					</div>
				</div>
				<div className="flights-table">
					<CustomTabs
						defaultActiveKey="1"
						items={items}
						onChange={handleTabChange}
						extraContent={
							<div style={{ marginBottom: '1rem' }}>
								<InputField
									label="Airport Name"
									name="search"
									placeholder="Search"
									warning="Required field"
									type="search"
								/>
							</div>
						}
					/>
				</div>
			</div>
		</>
	);
}

export default Milestone;
