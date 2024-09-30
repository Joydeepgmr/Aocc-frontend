import { Button, Dropdown, Form, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import DateField from '../datapicker/datepicker';
import './dateFilter.scss';
import { CalendarOutlined, CloseCircleOutlined } from '@ant-design/icons';

const DateFilter = ({ filter, setFilter }) => {
	const dateFormat = 'YYYY-MM-DD';
	const [visibility, setVisibility] = useState(false);
	const [form] = Form.useForm();
	const from = Form.useWatch('from', form);
	const to = Form.useWatch('to', form);
	const disableFutureDates = (current) => {
		return current && current > new Date();
	};
	const subtractDaysFromDate = (daysToSubtract) => {
		let endDate = dayjs()?.hour(23)?.toISOString();
		let startDate = dayjs()?.subtract(daysToSubtract, 'days')?.hour(0)?.toISOString();
		if (daysToSubtract === 1) {
			endDate = dayjs(startDate)?.hour(23)?.toISOString();
		}
		form.setFieldsValue({ from: dayjs(startDate), to: dayjs(endDate) });
		setFilter({ startDate, endDate });
		setVisibility(false);
	};

	const subtractMonthsFromDate = (monthsToSubtract) => {
		let endDate = dayjs()?.toISOString();
		let startDate = dayjs().subtract(monthsToSubtract, 'months').startOf('month').toISOString();
		if (monthsToSubtract >= 1) {
			endDate = dayjs().subtract(monthsToSubtract, 'months').endOf('month').toISOString();
		}
		form.setFieldsValue({ from: dayjs(startDate), to: dayjs(endDate) });
		setFilter({ startDate, endDate });
		setVisibility(false);
	};

	const disableBeforeStartDate = (current) => {
		if (from) {
			return current && (current <= dayjs(from) || current > dayjs());
		}
		return current && current > dayjs();
	};
	const removeDateFilter = () => {
		setFilter({ startDate: null, endDate: null });
		setVisibility(false);
		form.setFieldsValue({
			from: null,
			to: null,
		});
	};
	useLayoutEffect(() => {
		if (filter?.startDate && filter?.endDate) {
			form.setFieldsValue({
				from: dayjs(filter?.startDate),
				to: dayjs(filter?.endDate),
			});
		}
	}, [visibility]);
	useEffect(() => {
		if (from && to) {
			const startDate = from?.toISOString();
			const endDate = to?.toISOString();

			if (endDate < startDate) {
				message.dismiss();
				message.error('End date must be greater then Start date');
				form.setFieldsValue({ from: null, to: null });
				return;
			}
			setFilter({ startDate, endDate });
			setVisibility(false);
		} else if (from == null && to == null) {
			setVisibility(false);
			setFilter({ startDate: null, endDate: null });
		}
	}, [from, to]);

	const items = [
		{
			label: (
				<Form layout="vertical" form={form} className="date-date">
					<DateField
						label="From"
						name="from"
						width="8rem"
						height="2rem"
						disabledDate={disableFutureDates}
						isDisabledDate={true}
					/>
					<DateField
						label="TO"
						name="to"
						width="8rem"
						height="2rem"
						disabledDate={disableBeforeStartDate}
						isDisabledDate={true}
					/>
				</Form>
			),
			key: '0',
			bifurcate: 'Hourly',
		},
		{
			label: (
				<Button onClick={() => subtractDaysFromDate(0)} block>
					Today
				</Button>
			),
			key: '1',
			bifurcate: 'Hourly',
		},
		{
			label: (
				<Button onClick={() => subtractDaysFromDate(1)} block>
					Yesterday
				</Button>
			),
			key: '2',
			bifurcate: 'Hourly',
		},
		{
			label: (
				<Button onClick={() => subtractDaysFromDate(7)} block>
					Last 7 Days
				</Button>
			),
			key: '3',
			bifurcate: 'Daily',
		},
		{
			label: (
				<Button onClick={() => subtractMonthsFromDate(0)} block>
					This Month
				</Button>
			),
			key: '4',
			bifurcate: 'Weekly',
		},
		{
			label: (
				<Button onClick={() => subtractMonthsFromDate(1)} block>
					Past Month
				</Button>
			),
			key: '5',
			bifurcate: 'Weekly',
		},
	];

	return (
		<Dropdown
			menu={{ items }}
			trigger={['hover']}
			open={visibility}
			onOpenChange={() => setVisibility(!visibility)}
			className="dropdown-content"
		>
			<div className="flex-center">
				{filter.startDate ? (
					<div className={'filter-display'}>
						<span className={'filter-text'}>
							{dayjs(filter.startDate).format(dateFormat)}&nbsp;-&nbsp;
							{dayjs(filter.endDate).format(dateFormat)}
						</span>
						<CloseCircleOutlined onClick={removeDateFilter} />
					</div>
				) : (
					<CalendarOutlined className="calender" />
				)}
			</div>
		</Dropdown>
	);
};

export default React.memo(DateFilter);
