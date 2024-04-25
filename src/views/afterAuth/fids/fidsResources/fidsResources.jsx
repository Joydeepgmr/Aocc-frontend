import React, { useState } from 'react';
import TopHeader from '../../../../components/topHeader/topHeader';
import Button from '../../../../components/button/button';
import TableComponent from '../../../../components/table/table';
import Delete from '../../../../assets/Delete.svg';
import Edit from '../../../../assets/Edit.svg';
import ButtonComponent from '../../../../components/button/button';
import dayjs from 'dayjs';
import './FidsResources.scss';
import { Form } from 'antd';
import DropdownButton from '../../../../components/dropdownButton/dropdownButton';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';
import FidsFormComponent from './fidsFormComponent/fidsFormComponent';
import UploadCsvModal from '../../../../components/uploadCsvModal/uploadCsvModal';
import ModalComponent from '../../../../components/modal/modal';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';

const FidsResources = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const [form] = Form.useForm();

	const columns = [
		{
			title: 'Actions',
			dataIndex: 'edit',
			key: 'edit',
			render: (text, record) => (
				<div className="custom-button">
					<ButtonComponent
						type={'iconWithBorder'}
						icon={Delete}
						onClick={() => {
							setOpenDeleteModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
							});
						}}
						id="delete_button"
					></ButtonComponent>
					<ButtonComponent
						type={'iconWithBorder'}
						icon={Edit}
						onClick={() => {
							setOpenEditModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
							});
						}}
						id="edit_button"
					></ButtonComponent>
				</div>
			),
		},
		{
			title: 'Screen Name',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
		{
			title: 'Resource Type',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
			render: (type) => type ?? '-',
		},
		{
			title: 'Resource',
			dataIndex: 'resource',
			key: 'resource',
			align: 'center',
			render: (resource) => resource ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status) => status ?? '-',
		},
		{
			title: 'Mac',
			dataIndex: 'mac',
			key: 'mac',
			align: 'center',
			render: (mac) => mac ?? '-',
		},
		{
			title: 'Height',
			dataIndex: 'height',
			key: 'height',
			align: 'center',
			render: (height) => height ?? '-',
		},
		{
			title: 'Width',
			dataIndex: 'width',
			key: 'width',
			align: 'center',
			render: (width) => width ?? '-',
		},
		{
			title: 'View Details',
			dataIndex: 'viewdetails',
			key: 'viewdetails',
			render: (text, record) => (
				<ButtonComponent
					onClick={() => {
						setDetailModal(true);
						setRowData({
							...record,
							validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
							validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
						});
					}}
					title="View Details"
					type="text"
					style={{ margin: 'auto' }}
				/>
			),
			align: 'center',
		},
	];
	const data = [{ name: 'wewe' }];
	const handleDropdownChange = (value) => {
		// Add this line
		if (value === 'NewResource') {
			setIsAddModalOpen(true);
		}
		if (value === 'UploadCSV') {
			setIsCsvModalOpen(true);
		}
		if (value === 'downloadCSVTemplate') {
			// downloadCSV();
		}
	};
	const items = [
		{
			key: '1',
			label: 'New Resource',
			value: 'NewResource',
			children: '',
		},
		{
			key: '2',
			label: 'Upload CSV',
			value: 'UploadCSV',
			children: '',
		},
		{
			key: '3',
			label: 'Download CSV Template',
			value: 'downloadCSVTemplate',
		},
	];

	return (
		<>
			<div className="FidsResources--Container">
				<TopHeader heading="Resources">
					{Boolean(data?.length) && (
						<DropdownButton
							buttonText={'Create'}
							className="custom_dropdown"
							dropdownItems={items}
							onChange={handleDropdownChange}
						/>
					)}
				</TopHeader>
				{Boolean(data?.length) ? (
					<TableComponent
						columns={columns}
						data={data}
						// loading={loading}
						// fetchData={fetchData}
						// pagination={pagination}
					/>
				) : (
					<div className="FidsResources--EmptyContainer">
						{/* {!loading && ( */}
						<Button
							title={'Create'}
							id="btn"
							type="filledText"
							isSubmit="submit"
							onClick={() => setIsAddModalOpen(true)}
						/>
						<Button
							id="btn"
							title={'Upload Csv'}
							className="custom_svgButton"
							type="filledText"
							isSubmit="submit"
							onClick={() => setIsCsvModalOpen(true)}
						/>

						<Button
							id="btn"
							title={'Download CSV'}
							className="custom_svgButton"
							type="filledText"
							isSubmit="submit"
							// onClick={downloadCSV}
						/>
					</div>
				)}
			</div>
			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					setRowData({});
				}}
				// onSave={handleDeleteAirline}
				// isLoading={isDeleteAirlineLoading}
				content={`You want to delete this ${rowData?.name} record`}
			/>
			<ModalComponent
				form={form}
				isModalOpen={openEditModal}
				closeModal={() => {
					setOpenEditModal(false);
					setRowData({});
				}}
				title="Edit your resource"
				width="80vw"
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					type={'edit'}
					closeModal={() => {
						setOpenEditModal(false);
						setRowData({});
					}}
					initialValue={rowData}
					// isLoading={isUpdateAirlineLoading}
					// handleSubmit={handleUpdateAirline}
				/>
			</ModalComponent>
			<ModalComponent
				isModalOpen={detailModal}
				closeModal={() => {
					setDetailModal(false);
					setRowData({});
				}}
				title="Airline"
				width="80vw"
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					isReadOnly={true}
					closeModal={() => {
						setOpenEditModal(false);
						setRowData({});
					}}
					initialValue={rowData}
				/>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isAddModalOpen}
				width="80vw"
				closeModal={() => setIsAddModalOpen(false)}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Add Resource
					</CustomTypography>
				}
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					// isLoading={isAddAirlineLoading}
					closeModal={() => setIsAddModalOpen(false)}
					// handleSubmit={handleAddAirline}
				/>
			</ModalComponent>
			<UploadCsvModal
				isModalOpen={isCsvModalOpen}
				width="72rem"
				closeModal={() => setIsCsvModalOpen(false)}
				// handleUpload={handleUpload}
			/>
		</>
	);
};

export default FidsResources;
