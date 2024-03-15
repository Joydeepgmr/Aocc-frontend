import React from 'react';
import Timeline from 'react-visjs-timeline';
import './timeline.scss';
import CustomTypography from '../typographyComponent/typographyComponent';

const TimelineDesign = (props) => {
	const { items, groups, editable = true } = props;

	const options = {
		orientation: 'top',
		width: '100%',
		align: 'center',
		stack: true,
		showMajorLabels: false,
		showCurrentTime: true,
		editable: {
			remove: false,
			updateGroup: editable,
			updateTime: editable,
		},
		showTooltips: true,
		itemsAlwaysDraggable: {
			item: true,
			// range: true,
		},
		maxMinorChars: 10,
		format: {
			minorLabels: {
				minute: 'h:mma',
				hour: 'ha',
			},
		},

		onMove: (item) => console.log(item),
	};

	const labels = [
		{ name: 'Airline 1', color: '#02A0FC' },
		{ name: 'Airline 2', color: '#FFD43B' },
		{ name: 'Airline 3', color: '#2B8A3E' },
	];

	return (
		<>
			<Timeline options={options} groups={groups} items={items} itemsAlwaysDraggable />;
			<div className="timeline--BottomContainer">
				{labels?.map((item) => (
					<div className="timeline--LabelContainer">
						<div className="timeline--Label" style={{ background: item.color }}></div>{' '}
						<CustomTypography fontSize="1.4rem" color="#909296" fontWeight={400}>
							{item?.name}
						</CustomTypography>{' '}
					</div>
				))}
			</div>
		</>
	);
};

export default TimelineDesign;
