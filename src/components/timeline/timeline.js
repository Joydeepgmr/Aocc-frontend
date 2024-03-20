import React from 'react';
import Timeline from 'react-visjs-timeline';
import './timeline.scss';
import CustomTypography from '../typographyComponent/typographyComponent';

const TimelineDesign = (props) => {
	const { items, groups, editable = true, height = '400px', label } = props;

	const options = {
		orientation: 'top',
		width: '100%',
		align: 'center',
		height: height,
		autoResize: true,
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
		},
		maxMinorChars: 10,
		format: {
			minorLabels: {
				minute: 'h:mma',
				hour: 'ha',
			},
		},
		zoomMax: 1000 * 60 * 60 * 24,
		onMove: (item) => console.log(item),
		min: new Date().setDate(new Date().getDate() - 1),
		max: new Date().setDate(new Date().getDate() + 1),
	};

	return (
		<>
			<Timeline options={options} groups={groups} items={items} itemsAlwaysDraggable />
			<div className="timeline--BottomContainer">
				{label?.map((item) => (
					<div className="timeline--LabelContainer">
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
