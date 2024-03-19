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
	const [tabValue, setTabValue] = useState('CHECKIN_COUNTER');
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

	const { data: fetchedTimelineData } = useGetAllTimelineData(tabValue);
	const { data: fetchedGroupData } = useGetTimelineGroupData(tabValue);

	const timelineItems = fetchedTimelineData
		?.filter((item) => item?.status === 'occupied')
		?.map((item) => ({
			id: item?.id,
			start: CombineUtcDateAndIstTime(item?.date, item?.startTime),
			end: CombineUtcDateAndIstTime(item?.date, item?.endTime),
			group: item?.resourceId?.id,
			title: `<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: ${item?.resourceId?.status}</div>`,
		}));

	const timelineGroups = fetchedGroupData?.map((item) => ({ id: item?.id, content: item?.name }));

	const items = [
		{
			key: '1',
			label: 'Check-in Counters',
			children: (
				<div ref={divRef}>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
							<TimelineDesign
								height="80vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGroups} editable={isEditable} />
					)}
				</div>
			),
		},
		{
			key: '2',
			label: 'Gates',
			children: (
				<div ref={divRef}>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
							<TimelineDesign
								height="80vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGroups} editable={isEditable} />
					)}
				</div>
			),
		},
		{
			key: '3',
			label: 'Stands',
			children: (
				<div ref={divRef}>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
							<TimelineDesign
								height="80vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGroups} editable={isEditable} />
					)}
				</div>
			),
		},
		{
			key: '4',
			label: 'Belts',
			children: (
				<div ref={divRef}>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
							<TimelineDesign
								height="80vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGroups} editable={isEditable} />
					)}
				</div>
			),
		},
		{
			key: '5',
			label: 'Taxiways',
			children: (
				<div ref={divRef}>
					{fullScreen ? (
						<div className={'resourceAllocation--FullScreen'}>
							<FullscreenExitOutlined
								className="resourceAllocation--FullScreenExitIcon"
								onClick={toggleFullscreen}
							/>
							<TimelineDesign
								height="80vh"
								items={timelineItems}
								groups={timelineGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGroups} editable={isEditable} />
					)}
				</div>
			),
		},
	];

	const handleChange = (key) => {
		setIsEditable(false);
		setActiveTab(key);
		setTabValue(
			key === '1'
				? 'CHECKIN_COUNTER'
				: key === '2'
					? 'AIRPORT_GATE'
					: key === '3'
						? 'PARKING_STAND'
						: key === '4'
							? 'BAGGAGE_BELT'
							: 'TAXIWAY'
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
		<div className="resourceAllocation--Container">
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
