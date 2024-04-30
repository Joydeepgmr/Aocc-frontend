import React, { useEffect, useState, useMemo, memo } from 'react';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import InputField from '../../../../../components/input/field/field';
import Button from '../../../../../components/button/button';
import CheckBoxField from '../../../../../components/checkbox/checkbox';
import WeeklySelect from '../../../../../components/weeklySelect/weeklySelect';
import Date from '../../../../../components/datapicker/datepicker';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import CustomSelect from '../../../../../components/select/select';
import { SelectFlightType } from '../../../userAccess/userAccessData';
import { useAircraftDropdown  } from '../../../../../services/PlannerAirportMaster/PlannerAircraftAirportMaster';
import { useAirlineDropdown } from '../../../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';
import { useNatureCodeDropdown } from '../../../../../services/planairportmaster/resources/naturecode/naturecode';
import './formComponent.scss';


const FormComponent = ({ form, handleButtonClose, handleSaveButton, type, initialValues, isEdit }) => {
	const [tohChecked, setTohChecked] = useState(false);
	const [isDate, setIsDate] = useState(false);
	const [isStart, setIsStart] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [weekDays, setWeekDays] = useState([]);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	isEdit && (initialValues['airlineId'] = initialValues?.airline?.id);
	isEdit && (initialValues['natureCodeId'] = initialValues?.natureCode?.id);
	isEdit && (initialValues['aircraftId'] = initialValues?.aircraft?.id);

	const { data: airlineDropdownData = [] } = useAirlineDropdown();
	const { data: aircraftDropdownData = [] } = useAircraftDropdown();
	const { data: natureCodeDropdownData = [] } = useNatureCodeDropdown();

	const SelectAirlineData = useMemo(() => {
		return airlineDropdownData?.map((data) => {
			return { label: data?.twoLetterCode, value: data?.id };
		});
	}, [airlineDropdownData]);

	const SelectNatureCodeData = useMemo(() => {
		return natureCodeDropdownData?.map((data) => {
			return { label: data?.natureCode, value: data?.id };
		});
	}, [natureCodeDropdownData]);

	const SelectAircraftData = useMemo(() => {
		console.log(aircraftDropdownData, 'aircraftdataaaaa');
		return aircraftDropdownData?.map((data) => {
			return { label: data?.registration, value: data?.id };
		});
	}, [aircraftDropdownData]);

	const handleCheckboxChange = () => {
		setTohChecked(!tohChecked);
	};

	const handleDateChange = (dateString) => {
		if (dateString) {
			setIsDate(true);
			form.setFieldsValue({
				start: null,
				end: null,
				days: 0,
				weeklySelect: [],
			});
		} else {
			setStartDate(null);
			setEndDate(null);
			setIsDate(false);
		}
	};

	const handleStartDate = (dateString) => {
		if (dateString > endDate) {
			form.setFieldsValue({
				end: null,
			});
		}

		if (dateString === null) {
			setIsStart(false);
			setStartDate(null);
		} else {
			setIsStart(true);
			setStartDate(dateString?.format('YYYY-MM-DD'));
		}
	};

	const calculateDays = () => {
		let days = 0;
		if (startDate && endDate) {
			const startDay = dayjs(startDate);
			const endDay = dayjs(endDate);

			if (weekDays?.length) {
				let count = 0;
				let currentDay = startDay;

				while (currentDay <= endDay) {
					const dayOfWeek = currentDay.day();
					if (weekDays.includes(dayOfWeek)) {
						count++;
					}
					currentDay = currentDay.add(1, 'day');
				}

				days = count;
			} else days = endDay.diff(startDay, 'day');
		}
		form.setFieldValue('days', days);
	};

	const onFinish = (values) => {
		console.log(values, 'valueeee');
		values['toh'] = tohChecked;
		const { days, ...otherValues } = values;
		handleSaveButton(otherValues);
	};

	const handleDaysChange = (newSelectedDays) => {
		setWeekDays(newSelectedDays);
		form.setFieldValue('weeklySelect', newSelectedDays);
	};


	useEffect(() => {

		if (initialValues) {
			form.setFieldsValue(initialValues);
		}
	}, [initialValues]);

	useEffect(() => {
		calculateDays();
	}, [startDate, endDate, weekDays]);

	useEffect(()=>{
		return form.resetFields();
	},[])

	return (
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
				<div className="seasonal_form_container">
					<div className="seasonal_form_inputfields">
						<CustomSelect
							SelectData={SelectAirlineData}
							label="Airline"
							required
							name="airlineId"
							placeholder={'Select Airline'}
							className="select"
						/>
						<InputField
							label="Flight Number"
							name="flightNo"
							pattern="^[0-9]+$"
							required
							min={2}
							max={5}
							placeholder="Enter the airport name"
							className="custom_input"
							patternWarning={'Please enter only numbers'}
						/>
						<Date
							label="Date"
							name="date"
							placeholder="Date"
							className="custom_date"
							disabledFor="past"
							onChange={handleDateChange}
							required={!startDate || !endDate}
						/>
					</div>
					<div className="seasonal_form_inputfields">
						<CustomSelect
							SelectData={SelectNatureCodeData}
							label="Nature Code"
							name="natureCodeId"
							required
							placeholder={'Select Nature Code'}
							className="select"
						/>

						<InputField
							label={type == 1 ? 'Origin Airport' : 'Destination Airport'}
							name="origin"
							max={3}
							required
							placeholder="Filled Text"
							pattern="^[a-zA-Z]+$"
							className="custom_input"
						/>

						{type == 1 ? (
							<InputField
								label="STA"
								name="sta"
								type="time"
								placeholder="Filled Text"
								required={type == 1}
								className="custom_input"
							/>
						) : (
							<InputField
								label="STD"
								name="std"
								type="time"
								placeholder="Filled Text"
								required={type != 1}
								className="custom_input"
							/>
						)}
					</div>
					<div className="seasonal_form_inputfields">
						<CustomSelect
							SelectData={SelectAircraftData}
							label="Aircraft"
							name="aircraftId"
							required
							placeholder={'Select Aircraft'}
							className="select"
						/>
						<CustomSelect
							SelectData={SelectFlightType}
							placeholder={'Types of Flight'}
							className="custom_input"
							required
							label="Flight Type"
							name="type"
						/>
						<CheckBoxField
							name="toh"
							label="Towing to Hanger"
							checked={tohChecked}
							type="custom"
							onChange={handleCheckboxChange}
						/>
					</div>
					<div className="seasonal_form_inputfields">
						<InputField
							label="Duration"
							name="duration"
							placeholder="Filled text"
							className="custom_input"
							pattern="^[0-9]+$"
							patternWarning={'Please enter only numbers'}
						/>
					</div>

					<Divider />

					{tohChecked && (
						<div>
							<CustomTypography
								type="text"
								fontSize={14}
								fontWeight="400"
								color="#5C5F66"
								className="label"
							>
								Flight Split
							</CustomTypography>
							<div className="seasonal_form_inputfields">
								<InputField
									label="Flight Number"
									name="flightNumber"
									placeholder="Enter the airport name"
									className="custom_input"
								/>
								<InputField
									label="Call Sign"
									name="callSign"
									placeholder="Filled Text"
									className="custom_input"
								/>
							</div>

							<div className="seasonal_form_inputfields">
								<InputField
									label="Registration"
									name="registration"
									placeholder="Filled Text"
									className="custom_input"
								/>
								<InputField
									label="Destination"
									name="destination"
									placeholder="Filled Text"
									className="custom_input"
								/>
							</div>
							<Divider />
						</div>
					)}

					{!isEdit && !isDate && (
						<div>
							<CustomTypography
								type="text"
								fontSize={14}
								fontWeight="400"
								color="#5C5F66"
								className="label"
							>
								Flight Recurrence
							</CustomTypography>
							<div className="seasonal_form_inputfields">
								<Date
									label="Absolute Period"
									name="start"
									placeholder="From"
									className="custom_date"
									disabledFor="past"
									onChange={handleStartDate}
								/>
								<Date
									label=""
									name="end"
									placeholder="To"
									className="custom_date"
									onChange={(date) => setEndDate(date)}
									disabled={!isStart}
									isDisabledDate={true}
									disabledDate={(current) => {
										let prevDate = dayjs(startDate).format('YYYY-MM-DD');
										return current && current < dayjs(prevDate, 'YYYY-MM-DD');
									}}
								/>
								<InputField
									label="Days"
									name="days"
									placeholder="Enter the total No. of days"
									className="custom_input"
									disabled
									type="number"
								/>
							</div>

							<div className="seasonal_form_inputfields">
								<Date label="Relative Period" placeholder="From" className="custom_date" />
								<Date label="" placeholder="To" className="custom_date" />
								<WeeklySelect
									name="weeklySelect"
									label="Set Flight Recurrence"
									days={days}
									onChange={handleDaysChange}
									value={initialValues?.weeklySelect}
									className="select"
									required={Boolean(startDate) && Boolean(endDate)}
								/>
							</div>
							<Divider />
						</div>
					)}
				</div>
				<div className="seasonal_form_inputfields">
					<div className="form_bottomButton">
						<Button
							id="btn"
							title="Discard"
							className="custom_svgButton"
							type="filledText"
							onClick={handleButtonClose}
						/>
						<Button id="btn" title="Save" type="filledText" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default memo(FormComponent);
