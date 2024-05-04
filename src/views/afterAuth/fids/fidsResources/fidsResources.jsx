import React, { useState } from 'react';
import TopHeader from '../../../../components/topHeader/topHeader';
import Button from '../../../../components/button/button';
import TableComponent from '../../../../components/table/table';
import Delete from '../../../../assets/Delete.svg';
import Edit from '../../../../assets/Edit.svg';
import ButtonComponent from '../../../../components/button/button';
import dayjs from 'dayjs';
import './fidsResources.scss';
import { Form } from 'antd';
import DropdownButton from '../../../../components/dropdownButton/dropdownButton';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';
import FidsFormComponent from './fidsFormComponent/fidsFormComponent';
import UploadCsvModal from '../../../../components/uploadCsvModal/uploadCsvModal';
import ModalComponent from '../../../../components/modal/modal';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import {
	useDeleteFidsResource,
	useGetAllFidsResources,
	usePostFidsResource,
	useUpdateFidsResource,
} from '../../../../services';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { ConvertIstToUtc } from '../../../../utils';
import PageLoader from '../../../../components/pageLoader/pageLoader';

const FidsResources = () => {
	const queryClient = useQueryClient();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [resourceData, setResourceData] = useState([]);

	const [form] = Form.useForm();
	const addResourceHandler = {
		onSuccess: (data) => handleAddResourceSuccess(data),
		onError: (error) => handleAddResourceError(error),
	};

	const getResourceHandler = {
		onSuccess: (data) => handleGetResourceSuccess(data),
		onError: (error) => handleGetResourceError(error),
	};
	const deleteResourceHandler = {
		onSuccess: (data) => handleDeleteResourceSuccess(data),
		onError: (error) => handleDeleteResourceError(error),
	};

	const updateResourceHandler = {
		onSuccess: (data) => handleUpdateResourceSuccess(data),
		onError: (error) => handleUpdateResourceError(error),
	};

	const {
		isLoading: isResourceLoading,
		isFetching: isResourceFetching,
		hasNextPage,
		fetchNextPage,
	} = useGetAllFidsResources(getResourceHandler);

	const { mutate: onDeleteResource, isLoading: isDeleteResourceLoading } =
		useDeleteFidsResource(deleteResourceHandler);

	const { mutate: onAddResource, isLoading: isAddResourceLoading } = usePostFidsResource(addResourceHandler);
	const { mutate: onUpdateResource, isLoading: isUpdateResourceLoading } = useUpdateFidsResource(
		rowData?.id,
		updateResourceHandler
	);

	const handleDeleteResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-fids-resources');
		toast.success(data?.message);
		setRowData({});
		setOpenDeleteModal(false);
	};

	const handleDeleteResourceError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleGetResourceSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setResourceData([...newData]);
		}
	};

	const handleGetResourceError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-fids-resources');
		toast.success(data?.message);
		setRowData({});
		setIsAddModalOpen(false);
		form.resetFields();
	};

	const handleAddResourceError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleUpdateResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-fids-resources');
		toast.success(data?.message);
		setRowData({});
		setOpenEditModal(false);
		form.resetFields();
	};

	const handleUpdateResourceError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddResource = (value) => {
		const data = {
			...value,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			validFrom: value?.validFrom ? ConvertIstToUtc(value?.validFrom) : undefined,
			unavailableTo: value?.unavailableTo ? ConvertIstToUtc(value?.unavailableTo) : undefined,
			unavailableFrom: value?.unavailableFrom ? ConvertIstToUtc(value?.unavailableFrom) : undefined,
		};
		onAddResource(data);
	};

	const handleUpdateResource = (value) => {
		const data = {
			...value,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			validFrom: value?.validFrom ? ConvertIstToUtc(value?.validFrom) : undefined,
			unavailableTo: value?.unavailableTo ? ConvertIstToUtc(value?.unavailableTo) : undefined,
			unavailableFrom: value?.unavailableFrom ? ConvertIstToUtc(value?.unavailableFrom) : undefined,
		};
		onUpdateResource(data);
	};

	const handleDeleteResource = () => {
		onDeleteResource(rowData?.id);
	};

	const columns = [
		{
			title: 'Actions',
			dataIndex: 'edit',
			key: 'edit',
			render: (text, record) => (
				<div className="custom-button">
					<ButtonComponent
						type={'iconWithBorderDelete'}
						icon={Delete}
						onClick={() => {
							setOpenDeleteModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
								unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : undefined,
								unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : undefined,
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
								unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : undefined,
								unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : undefined,
							});
						}}
						id="edit_button"
					></ButtonComponent>
				</div>
			),
		},
		{
			title: 'SCRN',
			dataIndex: 'screenName',
			key: 'screenName',
			align: 'center',
			render: (screenName) => screenName ?? '-',
		},
		{
			title: 'RES TYPE',
			dataIndex: 'resourceType',
			key: 'resourceType',
			align: 'center',
			render: (resourceType) => resourceType ?? '-',
		},
		{
			title: 'RES',
			dataIndex: 'resourceName',
			key: 'resourceName',
			align: 'resourceName',
			render: (resourceName) => resourceName ?? '-',
		},
		{
			title: 'STS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status) => status ?? '-',
		},
		{
			title: 'MAC',
			dataIndex: 'MacAddress',
			key: 'MacAddress',
			align: 'center',
			render: (MacAddress) => MacAddress ?? '-',
		},
		{
			title: 'HEIGHT',
			dataIndex: 'height',
			key: 'height',
			align: 'center',
			render: (height) => height ?? '-',
		},
		{
			title: 'WIDTH',
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
							unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : undefined,
							unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : undefined,
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
	const handleDropdownChange = (value) => {
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
		// {
		// 	key: '2',
		// 	label: 'Upload CSV',
		// 	value: 'UploadCSV',
		// 	children: '',
		// },
		// {
		// 	key: '3',
		// 	label: 'Download CSV Template',
		// 	value: 'downloadCSVTemplate',
		// },
	];

	return (
		<>
			{(isResourceLoading || isResourceFetching || isUpdateResourceLoading || isAddResourceLoading) && (
				<PageLoader
					loading={isResourceLoading || isResourceFetching || isUpdateResourceLoading || isAddResourceLoading}
				/>
			)}
			<div className="FidsResources--Container">
				<TopHeader heading="Resources">
					{Boolean(resourceData?.length) && (
						<DropdownButton
							buttonText={'Create'}
							className="custom_dropdown"
							dropdownItems={items}
							onChange={handleDropdownChange}
						/>
					)}
				</TopHeader>
				{Boolean(resourceData?.length) ? (
					<TableComponent
						columns={columns}
						data={resourceData}
						loading={isResourceLoading || isResourceFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
					/>
				) : (
					<div className="FidsResources--EmptyContainer">
						{!(isResourceLoading || isResourceFetching) && (
							<>
								<Button
									title={'Create'}
									id="btn"
									type="filledText"
									isSubmit="submit"
									onClick={() => setIsAddModalOpen(true)}
								/>
								{/* <Button
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
								/> */}
							</>
						)}
					</div>
				)}
			</div>
			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					form.resetFields();
					setRowData({});
				}}
				onSave={handleDeleteResource}
				isLoading={isDeleteResourceLoading}
				content={`You want to delete this ${rowData?.screenName} record`}
			/>
			<ModalComponent
				form={form}
				isModalOpen={openEditModal}
				closeModal={() => {
					setOpenEditModal(false);
					form.resetFields();
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
						form.resetFields();
						setRowData({});
					}}
					initialValue={rowData}
					isLoading={isUpdateResourceLoading}
					handleSubmit={handleUpdateResource}
				/>
			</ModalComponent>
			<ModalComponent
				isModalOpen={detailModal}
				closeModal={() => {
					setDetailModal(false);
					form.resetFields();
					setRowData({});
				}}
				title="Resource"
				width="80vw"
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					isReadOnly={true}
					closeModal={() => {
						setDetailModal(false);
						form.resetFields();
						setRowData({});
					}}
					initialValue={rowData}
				/>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isAddModalOpen}
				width="80vw"
				closeModal={() => {
					setRowData({});
					form.resetFields();
					setIsAddModalOpen(false);
				}}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Add Resource
					</CustomTypography>
				}
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					isLoading={isAddResourceLoading}
					closeModal={() => {
						setIsAddModalOpen(false);
						form.resetFields();
						setRowData({});
					}}
					handleSubmit={handleAddResource}
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
