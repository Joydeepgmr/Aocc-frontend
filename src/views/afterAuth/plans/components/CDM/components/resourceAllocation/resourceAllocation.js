import React, { useState } from 'react';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import './resourceAllocation.scss';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import TimelineDesign from '../../../../../../../components/timeline/timeline';
import Button from '../../../../../../../components/button/button';

const ResourceAllocation = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [isEditable, setIsEditable] = useState(false);
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

	const items = [
		{
			key: '1',
			label: 'Check-in-counters',
			children: <TimelineDesign items={timelineItems} groups={timelineCounterGroups} editable={isEditable} />,
		},
		{
			key: '2',
			label: 'Gates',
			children: <TimelineDesign items={timelineItems} groups={timelineGateGroups} editable={isEditable} />,
		},
		{
			key: '3',
			label: 'Stands',
			children: <TimelineDesign items={timelineItems} groups={timelineStandsGroups} editable={isEditable} />,
		},
		{
			key: '4',
			label: 'Belts',
			children: <TimelineDesign items={timelineItems} groups={timelineBeltGroups} editable={isEditable} />,
		},
	];

	const handleChange = (key) => {
		setIsEditable(false);
		setActiveTab(key);
	};

	return (
		<div className="resourceAllocation--Container">
			<TopHeader
				heading="Resource Management"
				subHeading="Access information regarding resource allocation for flights"
			/>
			<CustomTabs
				defaultActiveKey={activeTab}
				items={items}
				onChange={handleChange}
				extraContent={
					<Button
						id="btn"
						title="Edit"
						className={
							isEditable ? 'resourceAllocation--Button' : 'custom_svgButton resourceAllocation--Button'
						}
						type="filledText"
						isSubmit="submit"
						onClick={() => setIsEditable(true)}
					/>
				}
			/>
		</div>
	);
};

export default ResourceAllocation;
