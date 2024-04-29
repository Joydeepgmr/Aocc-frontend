import React, { useEffect, useRef, useState } from 'react';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import './resourceAllocation.scss';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import TimelineDesign from '../../../../../../../components/timeline/timeline';
import Button from '../../../../../../../components/button/button';
import CustomSelect from '../../../../../../../components/select/select';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import {
	useGetAllTimelineData,
	useGetTimelineGroupData,
	useUpdateResourceAllocation,
} from '../../../../../../../services';
import { CombineUtcDateAndIstTime } from '../../../../../../../utils';
import dayjs from 'dayjs';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import SocketEventListener from '../../../../../../../socket/listner/socketListner';
import { GET_ALL_TIMELINE_DATA, GET_TIMELINE_GROUP_DATA } from '../../../../../../../api';

const ResourceAllocation = () => {
	const queryClient = useQueryClient();
	const divRef = useRef(null);
	const [activeTab, setActiveTab] = useState('1');
	const [tabValue, setTabValue] = useState('counter');
	const [isEditable, setIsEditable] = useState(false);
	const [selectedTimeValue, setSelectedTimeValue] = useState('24hrs');
	const [fullScreen, setFullScreen] = useState(false);
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

	const color = ['#02A0FC', '#FFD43B', '#3eb556', '#FA5252'];
	const { data: fetchedTimelineData, refetch: refetchTimelineData } = useGetAllTimelineData(
		tabValue,
		selectedTimeValue?.slice(0, 2)
	);
	const { data: fetchedGroupData, refetch: refetchTimelineGroupData } = useGetTimelineGroupData(
		tabValue,
		selectedTimeValue?.slice(0, 2)
	);
	const { mutate: updateResource } = useUpdateResourceAllocation(updateResourceHandler);

	const handleResourceMove = (data) => {
		const item = {
			type: tabValue,
			time: dayjs(data.start).format('YYYY-MM-DD HH:mm:ss'),
			mainSlotId: data?.id,
			resourceId: data?.group,
		};
		updateResource(item);
	};

	const timelineLabel =
		fetchedGroupData &&
		fetchedGroupData?.airlines?.map((item, i) => ({ id: i, label: item?.airline, color: color[i] }));
	const timelineItems =
		fetchedGroupData &&
		fetchedTimelineData &&
		fetchedTimelineData
			?.filter((item) => item?.status === 'occupied')
			?.map((item) => {
				const airlineIndex = timelineLabel.findIndex((labelItem) => labelItem.label === item?.flight?.AIRLINE);
				const className = airlineIndex !== -1 ? `timeline--${airlineIndex + 1}Airline` : '';

				return {
					id: item?.id,
					start: CombineUtcDateAndIstTime(item?.startTime.split('T')[0], item?.startTime.split('T')[1]),
					end: CombineUtcDateAndIstTime(item?.endTime.split('T')[0], item?.endTime.split('T')[1]),
					group: item?.resourceId?.id,
					content: `${item?.flight?.eta} ${item?.flight?.callSign}`,
					className,
					title: `<div>ETA: ${item?.flight?.eta} <br/><br/>Aircraft: ${item?.flight?.AIRLINE}<br/><br/>Flight Number: ${item?.flight?.FLIGHTNO}</div>`,
				};
			});

	const timelineGroups =
		fetchedGroupData && fetchedGroupData?.resourceData?.map((item) => ({ id: item?.id, content: item?.name }));

	const items = [
		{
			key: '1',
			label: 'Check-in Counters',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
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
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
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
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
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
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
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
			key: '5',
			label: 'Taxiways',
			children: (
				<div>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
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
			key === '1' ? 'counter' : key === '2' ? 'gate' : key === '3' ? 'stand' : key === '4' ? 'belt' : 'taxi'
		);
	};

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
			<TopHeader
				heading="Resource Management"
				subHeading="Access information regarding resource allocation for flights"
			>
				<FullscreenOutlined onClick={toggleFullscreen} className="resourceAllocation--FullScreenIcon" />
			</TopHeader>

			<CustomTabs
				defaultActiveKey={activeTab}
				items={items}
				onChange={handleChange}
				extraContent={
					<div className="resourceAllocation--SideTabContent">
						<Button
							id="btn"
							title={'Run Rule Engine'}
							className={'resourceAllocation--Button'}
							type="filledText"
							isSubmit="submit"
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
						/>
						<CustomSelect
							SelectData={SelectTime}
							placeholder={'Select Format'}
							onChange={handleTimeValueChange}
							value={selectedTimeValue}
						/>
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
