import React, { useEffect, useState } from 'react';
import Common_table from '../../common_wrapper/common_table/common_table';
import Common_Card from '../../common_wrapper/common_card.js/common_card';

import {
	useDeletePlannerAirline,
	useGetAllPlannerAirline,
	usePostPlannerAirline,
	useUpdatePlannerAirline,
} from '../../../../../services';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import FormComponent from './formComponent/formComponent';
import { useQueryClient } from 'react-query';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';

const Airlines = () => {
	const queryClient = useQueryClient();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [airlineData, setAirlineData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [rowData, setRowData] = useState({});

	const getAirlineHandler = {
		onSuccess: (data) => handleGetAirlineSuccess(data),
		onError: (error) => handleGetAirlineError(error),
	};

	const deleteAirlineHandler = {
		onSuccess: (data) => handleDeleteAirlineSuccess(data),
		onError: (error) => handleDeleteAirlineError(error),
	};

	const addAirlineHandler = {
		onSuccess: (data) => handleAddAirlineSuccess(data),
		onError: (error) => handleAddAirlineError(error),
	};
	const editAirlineHandler = {
		onSuccess: (data) => handleEditAirlineSuccess(data),
		onError: (error) => handleEditAirlineError(error),
	};

	const handleGetAirlineSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setAirlineData([...newData]);
		}
	};

	const handleGetAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleDeleteAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		setRowData({});
		setOpenDeleteModal(false);
	};

	const handleDeleteAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		setRowData({});
		setIsAddModalOpen(false);
	};

	const handleAddAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		setRowData({});
		setOpenEditModal(false);
	};

	const handleEditAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const {
		data: fetchedPlannerAirline,
		isLoading: isPlannerAirlineLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetAllPlannerAirline(getAirlineHandler);

	const { mutate: onDeleteAirline, isLoading: isDeleteAirlineLoading } =
		useDeletePlannerAirline(deleteAirlineHandler);

	const { mutate: onAddAirline, isLoading: isAddAirlineLoading } = usePostPlannerAirline(addAirlineHandler);
	const { mutate: onUpdateAirline, isLoading: isUpdateAirlineLoading } = useUpdatePlannerAirline(
		rowData?.id,
		editAirlineHandler
	);

	const handleDeleteAirline = () => {
		onDeleteAirline(rowData?.id);
	};

	const handleAddAirline = (value) => {
		const data = {
			...value,
			twoLetterCode: value.twoLetterCode.join(''),
			threeLetterCode: value.threeLetterCode.join(''),
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			validFrom: value?.validFrom ? ConvertIstToUtc(value?.validFrom) : undefined,
		};
		onAddAirline(data);
	};

	const handleUpdateAirline = (value) => {
		const data = {
			name: value?.name,
			country: value?.country,
			remark: value?.remark,
			terminal: value?.terminal,
			airlineType: value?.airlineType,
			paymentMode: value?.paymentMode,
			address: value?.address,
			phoneNumber: value?.phoneNumber,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
		};
		onUpdateAirline(data);
	};

	const columns = [
		{
			title: '',
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
			title: 'Airline Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Airline Code',
			dataIndex: 'twoLetterCode',
			key: 'twoLetterCode',
			render: (twoLetterCode) => twoLetterCode ?? '-',
		},
		{
			title: 'ATC Code',
			dataIndex: 'threeLetterCode',
			key: 'threeLetterCode',
			render: (threeLetterCode) => threeLetterCode ?? '-',
		},
		{
			title: 'IATA Code',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.iataCode ?? '-',
		},
		{
			title: 'ICAO Code',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.icaoCode ?? '-',
		},
		{ title: 'Country', dataIndex: 'country', key: 'country', render: (country) => country ?? '-' },
		{
			title: 'Home Airport',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.name ?? '-',
		},
		{
			title: '',
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
				/>
			),
		},
	];

	return (
		<>
			{isPlannerAirlineLoading && (
				<PageLoader
					loading={
						isPlannerAirlineLoading ||
						isAddAirlineLoading ||
						isDeleteAirlineLoading ||
						isUpdateAirlineLoading
					}
				/>
			)}
			{Boolean(airlineData?.length) ? (
				<Common_table
					data={airlineData}
					columns={columns}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAirlineLoading}
					title={'Airlines'}
					openModal={() => setIsAddModalOpen(true)}
				/>
			) : (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					btnCondition={false}
					openModal={() => setIsAddModalOpen(true)}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					setRowData({});
				}}
				onSave={handleDeleteAirline}
				isLoading={isDeleteAirlineLoading}
				content={`You want to delete this ${rowData?.name} record`}
			/>
			<ModalComponent
				isModalOpen={openEditModal}
				closeModal={() => {
					setOpenEditModal(false);
					setRowData({});
				}}
				title="Setup your airline"
				width="80vw"
				className="custom_modal"
			>
				<FormComponent
					type={'edit'}
					closeModal={() => {
						setOpenEditModal(false);
						setRowData({});
					}}
					initialValue={rowData}
					key={Math.random() * 100}
					isLoading={isUpdateAirlineLoading}
					handleSubmit={handleUpdateAirline}
				/>
			</ModalComponent>
			<ModalComponent
				isModalOpen={detailModal}
				closeModal={() => {
					setDetailModal(false);
					setRowData({});
				}}
				title="Setup your airline"
				width="80vw"
				className="custom_modal"
			>
				<FormComponent
					isReadOnly={true}
					closeModal={() => {
						setOpenEditModal(false);
						setRowData({});
					}}
					initialValue={rowData}
					key={Math.random() * 100}
				/>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isAddModalOpen}
				width="80vw"
				closeModal={() => setIsAddModalOpen(false)}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Setup your airline
					</CustomTypography>
				}
				className="custom_modal"
			>
				<div className={`modal_content`}>
					<FormComponent
						key={Math.random() * 100}
						isLoading={isAddAirlineLoading}
						closeModal={() => setIsAddModalOpen(false)}
						handleSubmit={handleAddAirline}
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default React.memo(Airlines);
