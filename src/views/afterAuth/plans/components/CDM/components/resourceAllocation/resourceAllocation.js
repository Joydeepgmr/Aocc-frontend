import React, { useEffect, useRef, useState } from 'react';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import './resourceAllocation.scss';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import TimelineDesign from '../../../../../../../components/timeline/timeline';
import Button from '../../../../../../../components/button/button';
import CustomSelect from '../../../../../../../components/select/select';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useGetAllTimelineData, useGetTimelineGroupData } from '../../../../../../../services';
import { CombineUtcDateAndIstTime } from '../../../../../../../utils';

const ResourceAllocation = () => {
	const divRef = useRef(null);
	const [activeTab, setActiveTab] = useState('1');
	const [tabValue, setTabValue] = useState('counter');
	const [isEditable, setIsEditable] = useState(false);
	const [selectedTimeValue, setSelectedTimeValue] = useState('24hrs');
	const [fullScreen, setFullScreen] = useState(false);
	const handleTimeValueChange = (value) => {
		setSelectedTimeValue(value);
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

	const color = ['#02A0FC', '#FFD43B', '#2B8A3E', '#a83c32', '#a86132', '#a8a832', '#6fa832', '#32a89a'];
	const { data: fetchedTimelineData } = useGetAllTimelineData(tabValue, selectedTimeValue?.slice(0, 2));
	const { data: fetchedGroupData } = useGetTimelineGroupData(tabValue, selectedTimeValue?.slice(0, 2));

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
					content: 'Airline 3',
					className,
					title: `<div>Flight Number: ${item?.flight?.FLIGHTNO} <br/><br/>Aircraft Type: ${item?.flight?.AIRLINE}<br/><br/>Status: ${item?.resourceId?.status}</div>`,
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
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							groups={timelineGroups}
							label={timelineLabel}
							editable={isEditable}
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
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
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
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
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
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
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
							/>
						</div>
					) : (
						<TimelineDesign
							items={timelineItems}
							label={timelineLabel}
							groups={timelineGroups}
							editable={isEditable}
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
							title="Edit"
							className={
								isEditable
									? 'resourceAllocation--Button'
									: 'custom_svgButton resourceAllocation--Button'
							}
							type="filledText"
							isSubmit="submit"
							onClick={() => setIsEditable(true)}
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
