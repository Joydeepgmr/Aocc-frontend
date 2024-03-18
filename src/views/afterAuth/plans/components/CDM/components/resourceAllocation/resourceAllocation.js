import React, { useEffect, useRef, useState } from 'react';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import './resourceAllocation.scss';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import TimelineDesign from '../../../../../../../components/timeline/timeline';
import Button from '../../../../../../../components/button/button';
import CustomSelect from '../../../../../../../components/select/select';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

const ResourceAllocation = () => {
	const divRef = useRef(null);
	const [activeTab, setActiveTab] = useState(1);
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
	const timelineItems = [
		{
			id: 1,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 2',
			group: '3',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 2,
			start: '2024-04-21',
			end: '2024-04-22',
			content: 'Airline 1',
			group: '2',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 3,
			start: '2024-03-20',
			end: '2024-03-21',
			content: 'Airline 3',
			group: '4',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 4,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 1',
			group: '6',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 5,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 2',
			group: '5',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 6,
			start: '2024-03-10',
			end: '2024-03-11',
			content: 'Airline 2',
			group: '3',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 7,
			start: '2024-03-11',
			end: '2024-03-12',
			content: 'Airline 1',
			group: '2',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 8,
			start: '2024-03-20',
			end: '2024-03-21',
			content: 'Airline 3',
			group: '4',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 9,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 1',
			group: '6',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A124<br/><br/>Status: Landed</div>',
		},
	];

	const timelineBeltGroups = [
		{
			id: 1,
			content: 'belt 1',
		},
		{
			id: 2,
			content: 'belt 2',
		},
		{
			id: 3,
			content: 'belt 3',
		},
		{
			id: 4,
			content: 'belt 4',
		},
		{
			id: 5,
			content: 'belt 5',
		},
		{
			id: 6,
			content: 'belt 6',
		},
	];
	const timelineGateGroups = [
		{
			id: 1,
			content: 'gate 1',
		},
		{
			id: 2,
			content: 'gate 2',
		},
		{
			id: 3,
			content: 'gate 3',
		},
		{
			id: 4,
			content: 'gate 4',
		},
		{
			id: 5,
			content: 'gate 5',
		},
		{
			id: 6,
			content: 'gate 6',
		},
	];

	const timelineCounterGroups = [
		{
			id: 1,
			content: 'counter 1',
		},
		{
			id: 2,
			content: 'counter 2',
		},
		{
			id: 3,
			content: 'counter 3',
		},
		{
			id: 4,
			content: 'counter 4',
		},
		{
			id: 5,
			content: 'counter 5',
		},
		{
			id: 6,
			content: 'counter 6',
		},
	];
	const timelineStandsGroups = [
		{
			id: 1,
			content: 'stands 1',
		},
		{
			id: 2,
			content: 'stands 2',
		},
		{
			id: 3,
			content: 'stands 3',
		},
		{
			id: 4,
			content: 'stands 4',
		},
		{
			id: 5,
			content: 'stands 5',
		},
		{
			id: 6,
			content: 'stands 6',
		},
	];

	// const handleFullScreenChange = () => setFullScreen(!setFullScreen);

	// useEffect(() => {
	// 	document.addEventListener('fullscreenchange', handleFullScreenChange);
	// 	document.addEventListener('mozfullscreenchange', handleFullScreenChange);
	// 	document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
	// 	document.addEventListener('msfullscreenchange', handleFullScreenChange);

	// 	return () => {
	// 		document.removeEventListener('fullscreenchange', handleFullScreenChange);
	// 		document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
	// 		document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
	// 		document.removeEventListener('msfullscreenchange', handleFullScreenChange);
	// 	};
	// }, []);

	const items = [
		{
			key: '1',
			label: 'Check-in-counters',
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
								groups={timelineCounterGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineCounterGroups} editable={isEditable} />
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
								groups={timelineGateGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGateGroups} editable={isEditable} />
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
								groups={timelineStandsGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineStandsGroups} editable={isEditable} />
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
								groups={timelineBeltGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineBeltGroups} editable={isEditable} />
					)}
				</div>
			),
		},
		{
			key: '5',
			label: 'Taxi Way',
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
								groups={timelineGateGroups}
								editable={isEditable}
							/>
						</div>
					) : (
						<TimelineDesign items={timelineItems} groups={timelineGateGroups} editable={isEditable} />
					)}
				</div>
			),
		},
	];

	const handleChange = (key) => {
		setIsEditable(false);
		setActiveTab(key);
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
