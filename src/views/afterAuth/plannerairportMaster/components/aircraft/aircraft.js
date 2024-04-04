import React, { useState } from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import './aircraft.scss';
import FormComponent from './formComponent/formComponent';
import { useDeletePlannerAircraft, useGetAllPlannerAircraft } from '../../../../../services';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';

const Aircrafts = () => {
	const queryClient = useQueryClient();
	const [aircraftData, setAircraftData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [rowData, setRowData] = useState({});

	const getAircraftHandler = {
		onSuccess: (data) => handleGetAircraftSuccess(data),
		onError: (error) => handleGetAircraftError(error),
	};

	const deleteAircraftHandler = {
		onSuccess: (data) => handleDeleteAircraftSuccess(data),
		onError: (error) => handleDeleteAircraftError(error),
	};

	const handleGetAircraftSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setAircraftData([...newData]);
		}
	};

	const handleGetAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleDeleteAircraftSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-aircraft');
		toast.success(data?.message);
		setRowData({});
		setOpenDeleteModal(false);
	};

	const handleDeleteAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const {
		data: fetchedPlannerAircraft,
		isLoading: isPlannerAircraftLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetAllPlannerAircraft(getAircraftHandler);

	const { mutate: onDeleteAircraft, isLoading: isDeleteAircraftLoading } =
		useDeletePlannerAircraft(deleteAircraftHandler);

	const handleDeleteAircraft = () => {
		onDeleteAircraft(rowData?.id);
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
						id="delete_button"
						onClick={() => {
							setOpenDeleteModal(true);
							setRowData({
								...record,
								validFrom: dayjs(record?.validFrom),
								validTill: dayjs(record?.validTill),
							});
						}}
					></ButtonComponent>
					<ButtonComponent
						type={'iconWithBorder'}
						icon={Edit}
						onClick={() => {
							setOpenEditModal(true);
							setRowData({
								...record,
								validFrom: dayjs(record?.validFrom),
								validTill: dayjs(record?.validTill),
							});
						}}
						id="edit_button"
					></ButtonComponent>
				</div>
			),
		},
		{
			title: 'Registration',
			dataIndex: 'registration',
			key: 'registration',
			render: (registration) => registration ?? '-',
		},
		{ title: 'Internal', dataIndex: 'internal', key: 'internal', render: (internal) => internal ?? '-' },
		{
			title: 'IATA Code',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (iataCode) => iataCode ?? '-',
		},
		{
			title: 'ICAO Code',
			dataIndex: 'icaoCode',
			key: 'icaoCode',
			render: (icaoCode) => icaoCode ?? '-',
		},
		{
			title: 'Home Airport',
			dataIndex: 'airportId',
			key: 'airportId',
			render: (airportId) => airportId?.name ?? '-',
		},
		{
			title: 'Nationality',
			dataIndex: 'nationality',
			key: 'nationality',
			render: (nationality) => nationality ?? '-',
		},
		{ title: 'Type of Use', dataIndex: 'usage', key: 'usage', render: (usage) => usage ?? '-' },
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
							validFrom: dayjs(record?.validFrom),
							validTill: dayjs(record?.validTill),
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
			{Boolean(aircraftData?.length) ? (
				<Common_table
					Heading={'Setup aircraft registration'}
					columns={columns}
					data={aircraftData}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAircraftLoading}
					title={'Aircraft Registration'}
					formComponent={<FormComponent />}
				/>
			) : (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					btnCondition={false}
					Heading={'Setup aircraft registration'}
					formComponent={<FormComponent />}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					setRowData({});
				}}
				onSave={handleDeleteAircraft}
				content={`You want to delete this ${rowData?.registration} record`}
			/>
			<ModalComponent
				isModalOpen={openEditModal}
				closeModal={() => {
					setOpenEditModal(false);
					setRowData({});
				}}
				title="Setup aircraft registration"
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
				/>
			</ModalComponent>
			<ModalComponent
				isModalOpen={detailModal}
				closeModal={() => {
					setDetailModal(false);
					setRowData({});
				}}
				title="Setup aircraft registration"
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
				/>
			</ModalComponent>
		</>
	);
};

export default React.memo(Aircrafts);
