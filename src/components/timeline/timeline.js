import React from 'react';
import Timeline from 'react-visjs-timeline';
import CustomTypography from '../typographyComponent/typographyComponent';
import './timeline.scss';

const TimelineDesign = (props) => {
	const { items, groups, editable = true, height = '400px', label, handleMove, time } = props;

	const options = {
		// timeAxis: { scale: 'minute', step: 60 },
		orientation: 'top',
		width: '100%',
		align: 'center',
		minHeight: height,
		maxHeight: height,
		groupHeightMode: 'auto',
		autoResize: true,
		stack: true,
		stackSubgroups: true,
		showMajorLabels: false,
		showCurrentTime: true,
		verticalScroll: true,
		zoomable: true,
		editable: {
			remove: false,
			updateGroup: editable,
			updateTime: editable,
		},
		showTooltips: true,
		itemsAlwaysDraggable: {
			item: true,
		},
		maxMinorChars: 15,
		format: {
			minorLabels: {
				minute: 'h:mma',
				hour: 'ha',
			},
		},
		margin: {
			axis: 0,
			item: 0,
		},
		format: {
			minorLabels: {
				millisecond: 'SSS',
				second: 's',
				minute: 'HH:mm',
				hour: 'HH:mm',
				weekday: 'ddd D',
				day: 'D',
				week: 'w',
				month: 'MMM',
				year: 'YYYY',
			},
			majorLabels: {
				millisecond: 'HH:mm:ss',
				second: 'D MMMM HH:mm',
				minute: 'ddd D MMMM',
				hour: 'ddd D MMMM',
				weekday: 'MMMM YYYY',
				day: 'MMMM YYYY',
				week: 'MMMM YYYY',
				month: 'YYYY',
				year: '',
			},
		},
		zoomMax: time === '24' ? 1000 * 60 * 200 : 1000 * 60 * 200,
		zoomMin: time === '24' ? 1000 * 60 * 100 : 1000 * 60 * 100,
		onMove: (item) => handleMove(item),
		min: new Date().setHours(new Date().getHours() - 3),
		max:
			time === '12'
				? new Date().setHours(new Date().getHours() + 12)
				: new Date().setHours(new Date().getHours() + 24),
		rollingMode: { offset: '0.2', follow: true },
	};

	return (
		<>
			<Timeline options={options} groups={groups} items={items} itemsAlwaysDraggable />
			<div className="timeline--BottomContainer">
				{label?.map((item, index) => (
					<div key={index} className="timeline--LabelContainer">
						<div className="timeline--Label" style={{ background: item.color }}></div>{' '}
						<CustomTypography fontSize="1.4rem" color="#909296" fontWeight={400}>
							{item?.label}
						</CustomTypography>
					</div>
				))}
			</div>
		</>
	);
};

export default TimelineDesign;
