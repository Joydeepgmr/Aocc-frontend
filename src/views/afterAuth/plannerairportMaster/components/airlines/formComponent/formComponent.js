import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import ImageUpload from '../../../../../../components/imageUpload/imageUpload';
import InputField from '../../../../../../components/input/field/field';
import OtpField from '../../../../../../components/input/otp/otp';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import CustomSelect from '../../../../../../components/select/select';
import { useGetAirlineSyncData } from '../../../../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';
import { useCountriesDropdown } from '../../../../../../services/globalMasters/globalMaster';
import { AirlineTypeData, SelectPaymentData } from '../../../../userAccess/userAccessData';
import './formComponent.scss';

const FormComponent = ({
	isReadOnly,
	type,
	closeModal,
	initialValue,
	handleSubmit,
	isLoading,
	form,
	fileList,
	setFileList,
}) => {
	const [isValidFrom, setIsValidFrom] = useState(type === 'edit' ? true : false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [isDefault, setIsDefault] = useState(false);
	const [isUploadDisable, setIsUploadDisable] = useState(false);
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const watchOtp = Form?.useWatch('threeLetterCode', form);
	// const watchURL = Form?.useWatch('file', form);
	const getAirlineImageHandler = {
		onSuccess: ({ airlineData = {}, airlineImage = '' }) => {
			if (airlineData) {
				delete airlineData.threeLetterCode;
				delete airlineData.twoLetterCode;
				airlineData.validTill = airlineData?.validTill ? dayjs(airlineData?.validTill) : undefined;
				airlineData.validFrom = airlineData?.validFrom ? dayjs(airlineData?.validFrom) : undefined;
				form.setFieldsValue({ ...airlineData, file: airlineImage });
			}
			if (airlineImage) {
				setFileList([{ url: airlineImage }]);
				setIsDefault(true);
				setIsUploadDisable(false);
			} else {
				setFileList([]);
				form.setFieldsValue({ file: '' });
			}
		},
		onError: (error) => {
			setIsDefault(false);
		},
	};

	const { isSuccess: isGetImageSuccess, isLoading: isGetImageLoading } = useGetAirlineSyncData(
		Array.isArray?.(watchOtp) && watchOtp?.join('')?.length === 3 ? watchOtp?.join('') : '',
		getAirlineImageHandler
	);

	const handleValidFrom = (dateString) => {
		if (form.getFieldValue('validTill') < form.getFieldValue('validFrom')) {
			form.setFieldsValue({
				validTill: null,
			});
		}
		if (dateString === null) {
			form.setFieldsValue({
				validTill: null,
			});
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};

	const { data: countryDropdownData } = useCountriesDropdown({ onError });

	const SelectCountryData = useMemo(() => {
		return countryDropdownData?.map((data) => {
			return { label: data.name, value: data.name, id: data.name };
		});
	}, [countryDropdownData]);
	const isNotEditable = type === 'edit';

	const onFinishHandler = (value) => {
		if (!isDefault && type !== 'edit') {
			value.url = fileList?.[0]?.url
		}
		value.file = '';
		handleSubmit(value);
	};

	useEffect(() => {
		form.resetFields();
		if (initialValue) {
			form.setFieldsValue(initialValue);
		}
		if (initialValue) {
			form.setFieldsValue(initialValue);
		}
	}, [initialValue]);

	useEffect(() => {
		if (!Boolean(fileList?.length)) {
			form.setFieldsValue({
				file: null,
			});
		}
	}, [fileList]);

	return (
		<div key={initialValue?.id}>
			<PageLoader loading={isGetImageLoading} />
			<Form autoComplete='off' form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="airline_form_container">
					<div className="airline_form_inputfields">
						<OtpField
							otpLength={2}
							label="Two Letter Code"
							name="twoLetterCode"
							disabled={isReadOnly || isNotEditable}
							required
						/>
						<OtpField
							otpLength={3}
							label="Three Letter Code"
							name="threeLetterCode"
							disabled={isReadOnly || isNotEditable}
							required
						/>
						<InputField
							label="Airline Name"
							name="name"
							max={32}
							placeholder={!isReadOnly && 'Enter the airline name'}
							className="custom_input"
							disabled={isReadOnly}
							required
							isArticle={false}
						/>
						{type !== 'edit' && !isReadOnly && (
							<ImageUpload
								{...{
									fileList,
									setFileList,
									isDefault: isDefault,
									disabled: isUploadDisable,
									name: 'file',
									label: 'Airline logo',
									required: true,
								}}
							/>
						)}
					</div>
					<div className="airline_form_inputfields">
						<CustomSelect
							SelectData={SelectCountryData}
							label="Country"
							name="country"
							placeholder={!isReadOnly && 'Country'}
							className="custom_input"
							disabled={isReadOnly}
						/>
						<InputField
							label="Terminal"
							name="terminal"
							placeholder={!isReadOnly && 'Filled Text'}
							className="custom_input"
							disabled={isReadOnly}
							max={3}
						/>
						<InputField
							label="Remark"
							name="remark"
							max={32}
							placeholder={!isReadOnly && 'Remark'}
							className="custom_input"
							disabled={isReadOnly}
						/>
						<CustomSelect
							SelectData={AirlineTypeData}
							label="Airline Type"
							name="airlineType"
							multiple
							placeholder={!isReadOnly && 'Filled Text'}
							className="custom_input"
							disabled={isReadOnly}
						/>
					</div>
					<div className="airline_form_inputfields">
						<CustomSelect
							SelectData={SelectPaymentData}
							placeholder={!isReadOnly && 'Select the access type'}
							label="Mode of payment"
							name="paymentMode"
							disabled={isReadOnly}
						/>
						<InputField
							label="Address 1"
							name="address"
							max={32}
							placeholder={!isReadOnly && 'Address'}
							className="custom_input"
							disabled={isReadOnly}
						/>
						<InputField
							label="Phone"
							name="phoneNumber"
							max={20}
							min={10}
							pattern="^[0-9]+$"
							placeholder={!isReadOnly && 'Enter your Phone No.'}
							className="custom_input"
							disabled={isReadOnly}
						/>
					</div>
					<div className="airline_form_inputfields">
						<Date
							label="Valid From"
							placeholder={!isReadOnly && 'Select valid from date'}
							name="validFrom"
							className="custom_date"
							format="MM-DD-YYYY"
							disabled={isReadOnly || isNotEditable}
							required
							defaultValue={initialValue?.validFrom ? dayjs(initialValue?.validFrom) : undefined}
							onChange={handleValidFrom}
						/>
						<Date
							label="Valid To"
							placeholder={!isReadOnly && 'Select valid to date'}
							name="validTill"
							format="MM-DD-YYYY"
							className="custom_date"
							defaultValue={initialValue?.validTill ? dayjs(initialValue?.validTill) : undefined}
							disabled={isReadOnly || isNotEditable}
							isDisabledDate={true}
							disabledDate={(current) => {
								let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
								return current && current < dayjs(prevDate, 'YYYY-MM-DD');
							}}
						/>
					</div>
				</div>
				<div className="airline_form_inputfields">
					{!isReadOnly && (
						<>
							<Divider />
							<div className="custom_buttons">
								<ButtonComponent
									title="Cancel"
									type="filledText"
									className="custom_button_cancel"
									onClick={() => {
										setFileList([]);
										setIsUploadDisable(true);
										closeModal();
									}}
									disabled={isLoading}
								/>
								<ButtonComponent
									title={isNotEditable ? 'Update' : 'Save'}
									type="filledText"
									className="custom_button_save"
									isSubmit={true}
									disabled={isLoading}
								/>
							</div>
						</>
					)}
				</div>
			</Form>
		</div>
	);
};

export default memo(FormComponent);
