import React, { useState } from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import './aircraft.scss';
import FormComponent from './formComponent/formComponent';
import {
	useDeletePlannerAircraft,
	useGetAllPlannerAircraft,
	usePostPlannerAircraft,
	useUpdatePlannerAircraft,
} from '../../../../../services';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { GET_PLANNER_AIRCRAFT } from '../../../../../api';


const Aircrafts = () => {
	const queryClient = useQueryClient();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
	const addAircraftHandler = {
		onSuccess: (data) => handleAddAircraftSuccess(data),
		onError: (error) => handleAddAircraftError(error),
	};
	const editAircraftHandler = {
		onSuccess: (data) => handleEditAircraftSuccess(data),
		onError: (error) => handleEditAircraftError(error),
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

	const handleAddAircraftSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-aircraft');
		toast.success(data?.message);
		setRowData({});
		setIsAddModalOpen(false);
	};

	const handleAddAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditAircraftSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-aircraft');
		toast.success(data?.message);
		setRowData({});
		setOpenEditModal(false);
	};

	const handleEditAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const {
		data: fetchedPlannerAircraft,
		isLoading: isPlannerAircraftLoading,
		isFetching: isPlannerAircraftFetching,
		hasNextPage,
		fetchNextPage,
		refetch: getPlannerAircraftRefetch
	} = useGetAllPlannerAircraft(getAircraftHandler);

	const { mutate: onDeleteAircraft, isLoading: isDeleteAircraftLoading } =
		useDeletePlannerAircraft(deleteAircraftHandler);

	const { mutate: onAddAircraft, isLoading: isAddAircraftLoading } = usePostPlannerAircraft(addAircraftHandler);
	const { mutate: onUpdateAircraft, isLoading: isUpdateAircraftLoading } = useUpdatePlannerAircraft(
		rowData?.id,
		editAircraftHandler
	);

	const handleDeleteAircraft = () => {
		onDeleteAircraft(rowData?.id);
	};

	const handleAddAircraft = (value) => {
		const data = {
			...value,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			validFrom: value?.validFrom ? ConvertIstToUtc(value?.validFrom) : undefined,
		};
		onAddAircraft(data);
	};

	const handleUpdateAircraft = (value) => {
		const data = {
			registration: value?.registration,
			internal: value?.internal,
			iataCode: value?.iataCode,
			usage: value?.usage,
			cockpitCrew: value?.cockpitCrew,
			cabinCrew: value?.cabinCrew,
			mtow: value?.mtow,
			mow: value?.mow,
			annex: value?.annex,
			mainDeck: value?.mainDeck,
			ownerName: value?.ownerName,
			country: value?.country,
			address: value?.address,
			remark: value?.remark,
			nationality: value?.nationality,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
		};
		onUpdateAircraft(data);
	};

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
						id="delete_button"
						onClick={() => {
							setOpenDeleteModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
								aircraft_id: record?.globalAircraftType?.identifier,
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
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
								aircraft_id: record?.globalAircraftType?.identifier,
							});
						}}
						id="edit_button"
					></ButtonComponent>
				</div>
			),
		},
		{
			title: 'AC/ REGN',
			dataIndex: 'registration',
			key: 'registration',
			render: (registration) => registration ?? '-',
			align: 'center',
		},
		{
			title: 'Internal',
			dataIndex: 'internal',
			key: 'internal',
			render: (internal) => internal ?? '-',
			align: 'center',
		},
		{
			title: 'IATA',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (iataCode) => iataCode ?? '-',
			align: 'center',
		},
		{
			title: 'ICAO',
			dataIndex: 'icaoCode',
			key: 'icaoCode',
			render: (icaoCode) => icaoCode ?? '-',
			align: 'center',
		},
		{
			title: 'Home Airport',
			dataIndex: 'airportId',
			key: 'airportId',
			render: (airportId) => airportId?.name ?? '-',
			align: 'center',
		},
		{
			title: 'Nationality',
			dataIndex: 'nationality',
			key: 'nationality',
			render: (nationality) => nationality ?? '-',
			align: 'center',
		},
		{ title: 'Type of Use', dataIndex: 'usage', key: 'usage', render: (usage) => usage ?? '-', align: 'center' },
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
							aircraft_id: record?.globalAircraftType?.identifier,
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

	return (
		<>
			<SocketEventListener refetch={getPlannerAircraftRefetch} apiName={`${GET_PLANNER_AIRCRAFT}`} />
			{(isPlannerAircraftLoading || isPlannerAircraftFetching) && (
				<PageLoader
					loading={
						isPlannerAircraftLoading ||
						isAddAircraftLoading ||
						isDeleteAircraftLoading ||
						isUpdateAircraftLoading ||
						isPlannerAircraftFetching
					}
				/>
			)}
			{Boolean(aircraftData?.length) ? (
				<Common_table
					columns={columns}
					data={aircraftData}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAircraftLoading || isPlannerAircraftFetching}
					title={'Aircraft Registration'}
					openModal={() => setIsAddModalOpen(true)}
					type="aircraft"
					title1="New Aircraft Registration"
				/>
			) : (
				<Common_Card
					title1="New Aircraft Registration"
					btnCondition={false}
					openModal={() => setIsAddModalOpen(true)}
					loading={isPlannerAircraftFetching || isPlannerAircraftLoading}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					setRowData({});
				}}
				onSave={handleDeleteAircraft}
				isLoading={isDeleteAircraftLoading}
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
					key={Math.random() * 100}
					initialValue={rowData}
					handleSubmit={handleUpdateAircraft}
					isLoading={isUpdateAircraftLoading}
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
					key={Math.random() * 100}
					initialValue={rowData}
				/>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isAddModalOpen}
				width="80vw"
				closeModal={() => setIsAddModalOpen(false)}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Setup aircraft registration
					</CustomTypography>
				}
				className="custom_modal"
			>
				<div className={`modal_content`}>
					<FormComponent
						key={Math.random() * 100}
						closeModal={() => setIsAddModalOpen(false)}
						handleSubmit={handleAddAircraft}
						isLoading={isAddAircraftLoading}
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default React.memo(Aircrafts);
