import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
	GET_GLOBAL_AIRPORT,
	POST_GLOBAL_AIRPORT,
	PATCH_GLOBAL_AIRPORT,
	DELETE_GLOBAL_AIRPORT,
	GET_GLOBAL_AIRCRAFT_TYPE,
	POST_GLOBAL_AIRCRAFT_TYPE,
	POST_BULK_GLOBAL_AIRCRAFT_TYPE,
	GET_GLOBAL_AIRCRAFT_REGISTRATION,
	POST_GLOBAL_AIRCRAFT_REGISTRATION,
	GET_GLOBAL_AIRLINE,
	POST_GLOBAL_AIRLINE,
	PATCH_GLOBAL_AIRLINE,
	DELETE_GLOBAL_AIRLINE,
	PATCH_GLOBAL_AIRCRAFT_REGISTRATION,
	DELETE_GLOBAL_AIRCRAFT_REGISTRATION,
	DELETE_GLOBAL_AIRCRAFT_TYPE,
	PATCH_GLOBAL_AIRCRAFT_TYPE,
	POST_BULK_GLOBAL_AIRPORT,
} from '../../api/endpoints';

import { Post, Patch, Delete } from '../HttpServices/HttpServices';


export const useGlobalAirport = (props) => {
	const queryClient = useQueryClient();
	// for get all airport
	const getGlobalAirport = useMutation({
		mutationKey: ['global-airport'],
		mutationFn: async (props) => await Post(`${GET_GLOBAL_AIRPORT}`, props),
		onSuccess: (newData) => {
			console.log("on get success")
			const previousData = queryClient.getQueryData('global-airport') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-airport', updatedData);
		},
		...props,
	});
	
	// if (props == 'get') {
	// 	return { getGlobalAirport }
	// }
	//for create new airport
	const postGlobalAirport = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		onSuccess: () => {
			console.log("on post success")
		},
		...props,
	});
	// for edit an airport
	console.log(postGlobalAirport, 'postGLobalAirport');
	const patchGlobalAirport = useMutation({
		mutationKey: ['patch-global-airport'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRPORT}${payload.id}`, payload.values),
		onSuccess: ({ data }) => {
			console.log("on patch success")
			let updatedData = queryClient.getQueryData('global-airport') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-airport', updatedData);
		},
		...props,
	});
	//for delete an airport
	let deleteId = ''; // to handle delete flow
	const deleteGlobalAirport = useMutation(
		{
			mutationKey: ['delete-global-airport'],
			mutationFn: async (id) => {
				deleteId = id; return await Delete(`${DELETE_GLOBAL_AIRPORT}${id}`);
			},
			onSuccess: async ({ data }) => {
				console.log("on delete success")
				let updatedData = queryClient.getQueryData('global-airport') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== deleteId
				})
				queryClient.setQueryData('global-airport', updatedData);
				deleteId = '';
			},
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-airport') || [];

	return {
		getGlobalAirport,
		postGlobalAirport,
		patchGlobalAirport,
		deleteGlobalAirport,
		updatedData
	};
};


export const useUploadCSVAirport = (props) => {
	const response = useMutation({
		mutationKey: ['global-airport/upload'],
		mutationFn: (data) =>
			Post(`${POST_BULK_GLOBAL_AIRPORT}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSVAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['global-aircraft-type/upload'],
		mutationFn: (data) => Post(`${POST_BULK_GLOBAL_AIRCRAFT_TYPE}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};


export const useGlobalAircraftType = (props) => {
	const queryClient = useQueryClient();
	// for get all aircraft type
	const getGlobalAircraftType = useMutation({
		mutationKey: ['global-aircraft-type'],
		mutationFn: async (props) => await Post(`${GET_GLOBAL_AIRCRAFT_TYPE}`, props),
		onSuccess: (newData) => {
			const previousData = queryClient.getQueryData('global-aircraft-type') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-aircraft-type', updatedData);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
		...props,
	});
	if (props == 'get') {
		return { getGlobalAircraftType }
	}
	//for create new aircraft type
	const postGlobalAirCraftType = useMutation({
		mutationKey: ['post-global-aircraft-type'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
		onSuccess: ({ message }) => {
			queryClient.setQueryData('aircraft-type-success', message);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
		...props,
	});
	// for edit an aircraft type
	const patchGlobalAircraftType = useMutation({
		mutationKey: ['patch-global-aircraft-type'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_TYPE}${payload.id}`, payload.values),
		onSuccess: ({ data, message }) => {
			queryClient.setQueryData('aircraft-type-success', message);
			let updatedData = queryClient.getQueryData('global-aircraft-type') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-aircraft-type', updatedData);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
		...props,
	});
	//for delete an aircraft type
	let deleteId = ''; // to handle delete flow
	const deleteGlobalAircraftType = useMutation(
		{
			mutationKey: ['delete-global-aircraft-type'],
			mutationFn: async (id) => {
				deleteId = id; return await Delete(`${DELETE_GLOBAL_AIRCRAFT_TYPE}${id}`);
			},
			onSuccess: async ({ data, message }) => {
				queryClient.setQueryData('aircraft-type-success', message);
				let updatedData = queryClient.getQueryData('global-aircraft-type') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== deleteId
				})
				queryClient.setQueryData('global-aircraft-type', updatedData);
				deleteId = '';
				// if (updatedData.length === 0) {
				// 	response.mutate();
				// }
			},
			onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-type') || [];
	const successMessage = queryClient.getQueriesData('aircraft-type-success')?.[0]?.[1] ?? undefined;;
	const errorMessage = queryClient.getQueriesData('aircraft-type-error')?.[0]?.[1] ?? undefined;;
	return {
		getGlobalAircraftType,
		postGlobalAirCraftType,
		patchGlobalAircraftType,
		deleteGlobalAircraftType,
		updatedData,
		successMessage,
		errorMessage
	};
};
export const useGlobalAircraftRegistration = (props) => {
	const queryClient = useQueryClient();
	// for get all registration api
	const getGlobalAircraftRegistration = useMutation({
		mutationKey: ['global-aircraft-register'],
		mutationFn: async (props) => await Post(`${GET_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		onSuccess: (newData) => {
			const previousData = queryClient.getQueryData('global-aircraft-register') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-aircraft-register', updatedData);
		},
		onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
		...props,
	});
	//for create new aircraft registration
	const postGlobalAircraftRegistration = useMutation({
		mutationKey: ['post-global-aircraft-register'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		onSuccess: ({ message }) => {
			queryClient.setQueryData('aircraft-register-success', message);
		},
		onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
		...props,
	});
	// for edit an aircraft registration
	const patchGlobalAircraftRegistration = useMutation({
		mutationKey: ['patch-global-aircraft-register'],
		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		onSuccess: ({ data, message }) => {
			queryClient.setQueryData('aircraft-register-success', message);
			// let updatedData = queryClient.getQueryData('global-aircraft-register') || [];
			// updatedData = updatedData.map((elm) => {
			// 	if (elm.id === data.id) {
			// 		return data;
			// 	}
			// 	return elm;
			// })
			// queryClient.setQueryData('global-aircraft-register', updatedData);
		},
		onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
		...props,
	});
	//for delete an aircraft registration
	let deleteId = ''; // to handle delete flow
	const deleteGlobalAircraftRegistration = useMutation(
		{
			mutationKey: ['delete-global-aircraft-register'],
			mutationFn: async (id) => {
				deleteId = id;
				return await Delete(`${DELETE_GLOBAL_AIRCRAFT_REGISTRATION}${id}`);
			},
			onSuccess: async ({ data, message }) => {
				queryClient.setQueryData('aircraft-register-success', message);
				let updatedData = queryClient.getQueryData('global-aircraft-register') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== deleteId
				})
				queryClient.setQueryData('global-aircraft-register', updatedData);
				deleteId = '';
				// if (updatedData.length === 0) {
				// 	response.mutate();
				// }
			},
			onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-register') || [];
	const successMessage = queryClient.getQueriesData('aircraft-register-success')?.[0]?.[1] ?? undefined;
	const errorMessage = queryClient.getQueriesData('aircraft-register-error')?.[0]?.[1] ?? undefined;

	return {
		getGlobalAircraftRegistration,
		postGlobalAircraftRegistration,
		patchGlobalAircraftRegistration,
		deleteGlobalAircraftRegistration,
		updatedData,
		successMessage,
		errorMessage
	};
};

export const useGlobalAirline = (props) => {
	const queryClient = useQueryClient();
	const getGlobalAirline = useMutation({
		mutationKey: ['global-airline'],
		mutationFn: async () => await Post(`${GET_GLOBAL_AIRLINE}`),
		onSuccess: (newData) => {
			const previousData = queryClient.getQueryData('global-airline') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-airline', updatedData);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airline-error', message); },
		...props,
	});

	const postGlobalAirline = useMutation({
		mutationKey: ['post-global-airline'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRLINE}`, props),
		onSuccess: ({ message }) => {
			queryClient.setQueryData('airline-success', message);
			// queryClient.invalidateQueries('global-airline');
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airline-error', message); },
		...props,
	});

	const patchGlobalAirline = useMutation({
		mutationKey: ['patch-global-airline'],
		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRLINE}`, props), // Assuming PATCH_GLOBAL_AIRLINE is the endpoint for patching
		onSuccess: ({ data, message }) => {
			queryClient.setQueryData('airline-success', message);
			let updatedData = queryClient.getQueryData('global-airline') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-airline', updatedData);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airline-error', message); },
		...props,
	});

	let deleteId = ''
	const deleteGlobalAirline = useMutation({
		mutationKey: ['delete-global-airline'],
		mutationFn: async (id) => {
			deleteId = id;
			return await Delete(`${DELETE_GLOBAL_AIRLINE}${id}`);
		},
		onSuccess: async ({ data, message }) => {
			queryClient.setQueryData('airline-success', message);
			let updatedData = queryClient.getQueryData('global-airline') || [];
			updatedData = updatedData.filter((elm) => {
				return elm.id !== deleteId
			})
			queryClient.setQueryData('global-airline', updatedData);
			deleteId = '';
			// if (updatedData.length === 0) {
			// 	response.mutate();
			// }
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airline-error', message); },
		...props,
	});
	const updatedData = queryClient.getQueryData('global-airline') || [];
	const successMessage = queryClient.getQueryData('airline-success');
	const errorMessage = queryClient.getQueryData('airline-error');
	return { getGlobalAirline, postGlobalAirline, patchGlobalAirline, deleteGlobalAirline, updatedData, successMessage, errorMessage }
};