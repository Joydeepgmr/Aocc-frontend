import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_PLANNER_AIRCRAFT } from '../../../../../api';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import {
	useDeletePlannerAircraft,
	useGetAllPlannerAircraft,
	usePostPlannerAircraft,
	useUpdatePlannerAircraft,
} from '../../../../../services';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../utils';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import './aircraft.scss';
import FormComponent from './formComponent/formComponent';


const Aircrafts = () => {
	const queryClient = useQueryClient();
	const [aircraftData, setAircraftData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();
	const writeAccess = !!localStorage.getItem('masterAccess');
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
		handleDeleteModalClose();
	};

	const handleDeleteAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddAircraftSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-aircraft');
		toast.success(data?.message);
		handleDetailModalClose();
	};

	const handleAddAircraftError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditAircraftSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-aircraft');
		toast.success(data?.message);
		handleDetailModalClose();
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
		detailModal?.record?.id,
		editAircraftHandler
	);

	const handleDeleteAircraft = () => {
		onDeleteAircraft(openDeleteModal?.record?.id);
	};

	const handleAddAircraft = (value) => {
		const data = {
			...value,
			remark: value?.remark ? CapitaliseFirstLetter(value.remark) : undefined,
			mainDeck: value?.mainDeck ? CapitaliseFirstLetter(value.mainDeck) : undefined,
			annex: value?.annex ? CapitaliseFirstLetter(value.annex) : undefined,
			address: value?.address ? CapitaliseFirstLetter(value.address) : undefined,
			ownerName: value?.ownerName ? CapitaliseFirstLetter(value.ownerName) : undefined,
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
			country: value?.nationality,
			nationality: value?.nationality,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			remark: value?.remark ? CapitaliseFirstLetter(value.remark) : undefined,
			mainDeck: value?.mainDeck ? CapitaliseFirstLetter(value.mainDeck) : undefined,
			annex: value?.annex ? CapitaliseFirstLetter(value.annex) : undefined,
			address: value?.address ? CapitaliseFirstLetter(value.address) : undefined,
			ownerName: value?.ownerName ? CapitaliseFirstLetter(value.ownerName) : undefined,
		};
		onUpdateAircraft(data);
	};

	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
				aircraft_id: record?.globalAircraftType?.identifier,
			}
		}
		setDetailModal({ isOpen: true, record, isEdit });
	}
	const handleDetailModalClose = () => {
		setDetailModal({ isOpen: false, record: null });
		form.resetFields();
	}
	const handleDeleteModalOpen = (record) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
				aircraft_id: record?.globalAircraftType?.identifier,
			}
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}

	const columns = [
		// {
		// 	title: 'ACTIONS',
		// 	dataIndex: 'edit',
		// 	key: 'edit',
		// 	render: (text, record) => (
		// 		<div className="custom-button">
		// 			<ButtonComponent
		// 				type={'iconWithBorderEdit'}
		// 				icon={Edit}
		// 				onClick={() => handleDetailModalOpen(record, true)}
		// 			></ButtonComponent>
		// 			<ButtonComponent
		// 				type={'iconWithBorderDelete'}
		// 				icon={Delete}
		// 				onClick={() => handleDeleteModalOpen(record)}
		// 			></ButtonComponent>
		// 		</div>
		// 	),
		// },
		{
			title: 'A/C REG',
			dataIndex: 'registration',
			key: 'registration',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
			align: 'center',
		},
		// {
		// 	title: 'INTERNAL',
		// 	dataIndex: 'internal',
		// 	key: 'internal',
		// 	render: (internal) => internal ?? '-',
		// 	align: 'center',
		// },
		{
			title: '3L',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (iataCode) => iataCode ?? '-',
			align: 'center',
		},
		{
			title: '4L',
			dataIndex: 'icaoCode',
			key: 'icaoCode',
			render: (icaoCode) => icaoCode ?? '-',
			align: 'center',
		},
		{
			title: 'MTOW',
			dataIndex: 'mtow',
			key: 'mtow',
			render: (mtow) => mtow ?? '-',
			align: 'center',
		},
		{
			title: 'MOW',
			dataIndex: 'mow',
			key: 'mow',
			render: (mow) => mow ?? '-',
			align: 'center',
		},
		{
			title: 'ANNEX',
			dataIndex: 'annex',
			key: 'annex',
			render: (annex) => annex ?? '-',
			align: 'center',
		},
		{
			title: 'ENGINE',
			dataIndex: ['globalAircraftType', 'engineCount'],
			key: 'engineCount',
			align: 'center',
			render: (text) => text || '-',
		},
		{
			title: 'WING SPAN',
			dataIndex: ['globalAircraftType', 'wingspan'],
			key: 'wingspan',
			render: (wingspan) => wingspan ?? '-',
			align: 'center',
		},
		{
			title: 'LENGTH',
			dataIndex: ['globalAircraftType', 'length'],
			key: 'length',
			render: (length) => length ?? '-',
			align: 'center',
		},
		{
			title: 'SEATS',
			dataIndex: ['globalAircraftType', 'totalSeats'],
			key: 'totalSeats',
			align: 'center',
			render: (text) => text || '-',
		},
		// {
		// 	title: 'HOPO',
		// 	dataIndex: 'airportId',
		// 	key: 'airportId',
		// 	render: (airportId) => airportId?.name ?? '-',
		// 	align: 'center',
		// },
		{
			title: 'NATIONALITY',
			dataIndex: 'nationality',
			key: 'nationality',
			render: (nationality) => nationality ?? '-',
			align: 'center',
		},
		{ title: 'TYPE OF USE', dataIndex: 'usage', key: 'usage', render: (usage) => usage ?? '-', align: 'center' },
		// {
		// 	title: 'DETAIL',
		// 	dataIndex: 'viewDetails',
		// 	key: 'viewDetails',
		// 	render: (text, record) => (
		// 		<ButtonComponent
		// 			onClick={() => handleDetailModalOpen(record)}
		// 			title="View"
		// 			type="text"
		// 			style={{ margin: 'auto' }}
		// 		/>
		// 	),
		// 	align: 'center',
		// },
	];

	return (
		<>
			<SocketEventListener refetch={getPlannerAircraftRefetch} apiName={`${GET_PLANNER_AIRCRAFT}`} />
			{isPlannerAircraftLoading || isAddAircraftLoading || isDeleteAircraftLoading || isUpdateAircraftLoading || isPlannerAircraftFetching ? <PageLoader loading={true} /> : Boolean(aircraftData?.length) ? (
				<Common_table
					columns={columns}
					data={aircraftData}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAircraftLoading || isPlannerAircraftFetching}
					title={'Aircraft Registration'}
					openModal={writeAccess ? () => handleDetailModalOpen() : null}
					type="aircraft"
					title1="New Aircraft Registration"
					writeAccess={writeAccess}
				/>
			) : (
				<Common_Card
					title1="New Aircraft Registration"
					btnCondition={false}
					openModal={() => handleDetailModalOpen()}
					loading={isPlannerAircraftFetching || isPlannerAircraftLoading}
					writeAccess={writeAccess}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal?.isOpen}
				onClose={handleDeleteModalClose}
				onSave={handleDeleteAircraft}
				isLoading={isDeleteAircraftLoading}
				content={`You want to delete this ${openDeleteModal?.record?.registration} record`}
			/>
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				closeModal={handleDetailModalClose}
				title='Setup aircraft registration'
				width="80vw"
				record={detailModal?.record}
				onDelete={writeAccess && handleDeleteModalOpen}
				onEdit={(writeAccess && !detailModal?.isEdit) && handleDetailModalOpen}
				className="custom_modal"
			>
				<FormComponent
					form={form}
					type={detailModal?.isEdit && 'edit'}
					closeModal={handleDetailModalClose}
					initialValue={detailModal?.record}
					handleSubmit={detailModal?.isEdit ? handleUpdateAircraft : handleAddAircraft}
					isLoading={detailModal?.isEdit ? isUpdateAircraftLoading : isAddAircraftLoading}
					isReadOnly={detailModal?.record && !detailModal?.isEdit ? true : false}
				/>
			</ModalComponent>
		</>
	);
};

export default React.memo(Aircrafts);
