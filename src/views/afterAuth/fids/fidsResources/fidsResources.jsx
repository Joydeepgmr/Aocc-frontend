import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import Button from '../../../../components/button/button';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../components/modal/modal';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../components/table/table';
import TopHeader from '../../../../components/topHeader/topHeader';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import UploadCsvModal from '../../../../components/uploadCsvModal/uploadCsvModal';
import {
	useDeleteFidsResource,
	useGetAllFidsResources,
	usePostFidsResource,
	useUpdateFidsResource,
} from '../../../../services';
import { ConvertIstToUtc } from '../../../../utils';
import FidsFormComponent from './fidsFormComponent/fidsFormComponent';
import './fidsResources.scss';

const FidsResources = () => {
	const queryClient = useQueryClient();
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
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
		detailModal?.record?.id,
		updateResourceHandler
	);

	const handleDeleteResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-fids-resources');
		toast.success(data?.message);
		handleDeleteModalClose();
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
		handleDetailModalClose();
	};

	const handleAddResourceError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleUpdateResourceSuccess = (data) => {
		queryClient.invalidateQueries('get-all-fids-resources');
		toast.success(data?.message);
		handleDetailModalClose();
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
		onDeleteResource(openDeleteModal?.record?.id);
	};

	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
				aircraft_id: record?.globalAircraftType?.identifier,
			};
		}
		setDetailModal({ isOpen: true, record, isEdit });
	};
	const handleDetailModalClose = () => {
		setDetailModal({ isOpen: false, record: null });
		form.resetFields();
	};
	const handleDeleteModalOpen = (record) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
				unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : undefined,
				unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : undefined,
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	};
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	};

	const columns = [
		{
			title: 'SCRN',
			dataIndex: 'screenName',
			key: 'screenName',
			align: 'center',
			render: (text, record) => (
				<div
					style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
					onClick={() => handleDetailModalOpen(record)}
				>
					{text ?? '-'}
				</div>
			),
		},
		{
			title: 'RES TYPE',
			dataIndex: 'resourceType',
			key: 'resourceType',
			align: 'center',
			render: (resourceType) => (
				<div style={{ textTransform: 'capitalize' }}>{resourceType?.replace('_', ' ') ?? '-'}</div>
			),
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
			title: 'SCRN CODE',
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
	];
	const handleDropdownChange = (value) => {
		if (value === 'NewResource') {
			handleDetailModalOpen();
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
									onClick={() => handleDetailModalOpen()}
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
				isOpen={openDeleteModal?.isOpen}
				onClose={handleDeleteModalClose}
				onSave={handleDeleteResource}
				isLoading={isDeleteResourceLoading}
				content={`You want to delete this ${openDeleteModal?.record?.screenName} record`}
			/>
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				closeModal={handleDetailModalClose}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Fids Resource
					</CustomTypography>
				}
				width="80vw"
				record={detailModal?.record}
				onDelete={handleDeleteModalOpen}
				onEdit={!detailModal?.isEdit && handleDetailModalOpen}
				className="custom_modal"
			>
				<FidsFormComponent
					form={form}
					type={detailModal?.isEdit && 'edit'}
					closeModal={handleDetailModalClose}
					initialValue={detailModal?.record}
					isReadOnly={detailModal?.record && !detailModal?.isEdit ? true : false}
					isLoading={detailModal?.isEdit ? isUpdateResourceLoading : isAddResourceLoading}
					handleSubmit={detailModal?.isEdit ? handleUpdateResource : handleAddResource}
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
