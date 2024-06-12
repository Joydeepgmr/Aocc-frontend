import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_ALL_TIMELINE_DATA, GET_TIMELINE_GROUP_DATA } from '../../../../../../../api';
import Button from '../../../../../../../components/button/button';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import CustomSelect from '../../../../../../../components/select/select';
import TimelineDesign from '../../../../../../../components/timeline/timeline';
import {
	useGetAllTimelineData,
	useGetTimelineGroupData,
	useRunRuleEngine,
	useUpdateResourceAllocation,
} from '../../../../../../../services';
import SocketEventListener from '../../../../../../../socket/listner/socketListner';
import { CombineUtcDateAndIstTime } from '../../../../../../../utils';
import './resourceAllocation.scss';

const ResourceAllocation = ({ conflictType }) => {
	const queryClient = useQueryClient();
	const divRef = useRef(null);
	const [activeTab, setActiveTab] = useState('1');
	const [tabValue, setTabValue] = useState('counter');
	const [isEditable, setIsEditable] = useState(false);
	const [selectedTimeValue, setSelectedTimeValue] = useState('24hrs');
	const [fullScreen, setFullScreen] = useState(false);
	const writeAccess = !!localStorage.getItem('plannerAccess');

	const handleTimeValueChange = (value) => {
		setSelectedTimeValue(value);
	};

	const updateResourceHandler = {
		onSuccess: (data) => handleUpdateResourceSuccess(data),
		onError: (error) => handleUpdateResourceError(error),
	};

	const handleUpdateResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-timeline-data');
		toast.success(data?.message);
	};

	const handleUpdateResourceError = (error) => {
		queryClient.invalidateQueries('get-all-timeline-data');
		toast.error(error?.response?.data?.message);
	};

	const runRuleEngineHandler = {
		onSuccess: (data) => handleRunRuleEngineSuccess(data),
		onError: (error) => handleRunRuleEngineError(error),
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

	const { data: fetchedTimelineData, refetch: refetchTimelineData } = useGetAllTimelineData(
		tabValue,
		selectedTimeValue?.slice(0, 2)
	);
	const { data: fetchedGroupData, refetch: refetchTimelineGroupData } = useGetTimelineGroupData(
		tabValue,
		selectedTimeValue?.slice(0, 2)
	);
	const { mutate: updateResource } = useUpdateResourceAllocation(updateResourceHandler);

	const { refetch: refetchRunRuleEngine } = useRunRuleEngine(runRuleEngineHandler);

	const handleRunRuleEngineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-timeline-data');
		toast.success('Allocated Successfully');
	};

	const handleRunRuleEngineError = (error) => {
		queryClient.invalidateQueries('get-all-timeline-data');
		toast.error(error?.response?.data?.message);
	};

	const handleResourceMove = (data) => {
		const item = {
			type: tabValue,
			time: dayjs(data.start).format('YYYY-MM-DD HH:mm:ss'),
			mainSlotId: data?.id,
			resourceId: data?.group,
		};
		updateResource(item);
	};

	const timelineLabel = [
		{ id: 1, label: 'Domestic Flights', color: '#02A0FC' },
		{ id: 2, label: 'International Flights', color: '#FFD43B' },
		{ id: 3, label: 'On Ground Flights', color: '#3eb556' },
		{ id: 4, label: 'Conflict Flights', color: '#f76262' },
	];

	const timelineItems =
		fetchedGroupData &&
		fetchedTimelineData &&
		fetchedTimelineData
			?.filter((item) => item?.status === 'occupied')
			?.map((item) => {
				const className = item?.isConflict
					? `timeline--4Airline`
					: item?.flight?.type === 'domestic'
						? `timeline--1Airline`
						: item?.flight?.type === 'international'
							? `timeline--2Airline`
							: `timeline--3Airline`;
				const sequence = (flight) => {
					if (flight) {
						switch (flight?.flight?.flightType) {
							case 'arrival':
								if (flight?.onBlock) return flight?.onBlock;
								if (flight?.eob) return flight?.eob;
								if (flight?.ata) return flight?.ata;
								if (flight?.tmo) return flight?.tmo;
								if (flight?.eta) return flight?.eta;
								if (flight?.flight?.sta) return flight?.flight?.sta;
								break;
							case 'departure':
								if (flight?.offBlock) return flight?.offBlock;
								if (flight?.eob) return flight?.eob;
								if (flight?.atd) return flight?.atd;
								if (flight?.tmo) return flight?.tmo;
								if (flight?.etd) return flight?.etd;
								if (flight?.flight?.std) return flight?.flight?.std;
								break;
							default:
								return null;
						}
					}
					return null; // Default value if conditions not met or flight object is invalid
				};
				const name = (flight) => {
					if (flight) {
						switch (flight?.flight?.flightType) {
							case 'arrival':
								if (flight?.onBlock) return 'ONB';
								if (flight?.eob) return 'EOB';
								if (flight?.ata) return 'ATA';
								if (flight?.tmo) return 'TMO';
								if (flight?.eta) return 'ETA';
								if (flight?.flight?.sta) return 'STA';
								break;
							case 'departure':
								if (flight?.offBlock) return 'OFB';
								if (flight?.eob) return 'EOB';
								if (flight?.atd) return 'ATD';
								if (flight?.tmo) return 'TMO';
								if (flight?.etd) return 'ETD';
								if (flight?.flight?.std) return 'STD';
								break;
							default:
								return null;
						}
					}
					return null; // Default value if conditions not met or flight object is invalid
				};

				return {
					id: item?.id,
					start: CombineUtcDateAndIstTime(item?.startTime.split(' ')[0], item?.startTime.split(' ')[1]),
					end: CombineUtcDateAndIstTime(item?.endTime.split(' ')[0], item?.endTime.split(' ')[1]),
					group: item?.resourceId?.id,
					content: `${sequence(item) ?? ''} ${item?.flight?.callSign}`,
					className,
					title: `<div>${name(item) ?? ''} ${sequence(item) ?? ''} <br/>Aircraft: ${item?.flight?.aircraft?.registration}<br/>Flight Number: ${item?.flight?.flightNo}</div>`,
				};
			});

	const timelineGroups =
		fetchedGroupData &&
		fetchedGroupData?.resourceData?.map((item) => ({
			id: item?.id,
			content: `${item?.name} ${item?.terminal?.name ?? ''}`,
		}));

	const items = [
		{
			key: '1',
			label: 'Check-in Counters',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<TimelineDesign
								height="50vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
								label={timelineLabel}
								handleMove={handleResourceMove}
								time={selectedTimeValue?.slice(0, 2)}
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							groups={timelineGroups}
							label={timelineLabel}
							editable={isEditable}
							handleMove={handleResourceMove}
							time={selectedTimeValue?.slice(0, 2)}
						/>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: 'Gates',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<TimelineDesign
								height="50vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
								label={timelineLabel}
								handleMove={handleResourceMove}
								time={selectedTimeValue?.slice(0, 2)}
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
							handleMove={handleResourceMove}
							time={selectedTimeValue?.slice(0, 2)}
						/>
					)}
				</div>
			),
		},
		{
			key: '3',
			label: 'Stands',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<TimelineDesign
								height="50vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
								label={timelineLabel}
								handleMove={handleResourceMove}
								time={selectedTimeValue?.slice(0, 2)}
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
							handleMove={handleResourceMove}
							time={selectedTimeValue?.slice(0, 2)}
						/>
					)}
				</div>
			),
		},
		{
			key: '4',
			label: 'Belts',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<TimelineDesign
								height="50vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
								label={timelineLabel}
								handleMove={handleResourceMove}
								time={selectedTimeValue?.slice(0, 2)}
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
							handleMove={handleResourceMove}
							time={selectedTimeValue?.slice(0, 2)}
						/>
					)}
				</div>
			),
		},
	];

	const handleChange = (key) => {
		setIsEditable(false);
		setActiveTab(key);
		setTabValue(
			key === '1' ? 'counter' : key === '2' ? 'gate' : key === '3' ? 'stand' : key === '4' ? 'belt' : 'counter'
		);
	};

	useEffect(() => {
		handleChange(conflictType === '"check-in-counter' ? '1' : conflictType === 'gate' ? '2' : conflictType === 'stand' ? '3' : conflictType === 'belt' ? '4' : '1')
		console.log('conflict type inn useEffect is ', conflictType)
	}, [conflictType])
	console.log('conflict type is ', conflictType, activeTab, tabValue)

	const SelectTime = [
		{
			id: '1',
			label: '12hr',
			value: '12hrs',
		},
		{
			id: '2',
			label: '24hr',
			value: '24hrs',
		},
	];
	console.log('run one more time ', activeTab)
	return (
		<div className={`resourceAllocation--Container ${fullScreen && 'resourceAllocation--FullScreen'}`} ref={divRef}>
			<SocketEventListener
				refetch={refetchTimelineData}
				apiName={`${GET_ALL_TIMELINE_DATA}?type=${tabValue}&frame=${selectedTimeValue?.slice(0, 2)}`}
			/>
			<SocketEventListener
				refetch={refetchTimelineGroupData}
				apiName={`${GET_TIMELINE_GROUP_DATA}?type=${tabValue}&frame=${selectedTimeValue?.slice(0, 2)}`}
			/>

			<CustomTabs
				defaultActiveKey={activeTab}
				activeKey={activeTab}
				items={items}
				onChange={handleChange}
				extraContent={
					<div className="resourceAllocation--SideTabContent">
						{writeAccess &&
							<>
								<Button
									id="btn"
									title={'Run Rule Engine'}
									className={'resourceAllocation--Button'}
									type="filledText"
									isSubmit="submit"
									onClick={() => refetchRunRuleEngine()}
								/>
								<Button
									id="btn"
									title={isEditable ? `Stop Editing` : `Edit`}
									className={
										isEditable
											? 'resourceAllocation--Button'
											: 'custom_svgButton resourceAllocation--Button'
									}
									type="filledText"
									isSubmit="submit"
									onClick={() => setIsEditable(!isEditable)}
									disabled={!Boolean(timelineItems?.length)}
								/>
							</>
						}
						<CustomSelect
							SelectData={SelectTime}
							placeholder={'Select Format'}
							onChange={handleTimeValueChange}
							value={selectedTimeValue}
						/>
						{!fullScreen && (
							<FullscreenOutlined
								onClick={toggleFullscreen}
								className="resourceAllocation--FullScreenIcon"
							/>
						)}
						{fullScreen && (
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenIcon"
								onClick={toggleFullscreen}
							/>
						)}
					</div>
				}
			/>
			{/* {fullScreen && (
				<div  style={{ background: 'white', height: '100vh', width: '100vw' }}>
					{items.find((item) => item.key === activeTab)?.children}
				</div>
			)} */}
		</div>
	);
};

export default ResourceAllocation;
