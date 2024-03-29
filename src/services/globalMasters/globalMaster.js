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
	GET_COUNTRY_DATA,
} from '../../api/endpoints';

import { Post, Patch, Delete, Get } from '../HttpServices/HttpServices';


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
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airport-error', message); },
		...props,
	});


	//for create new airport
	const postGlobalAirport = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		onSuccess: ({ message }) => {
			queryClient.setQueryData('airport-success', message);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airport-error', message); },
		...props,
	});
	// for edit an airport
	console.log(postGlobalAirport, 'postGLobalAirport');
	const patchGlobalAirport = useMutation({
		mutationKey: ['patch-global-airport'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRPORT}${payload.id}`, payload.values),
		onSuccess: ({ data, message }) => {
			queryClient.setQueryData('airport-success', message);
			let updatedData = queryClient.getQueryData('global-airport') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-airport', updatedData);
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airport-error', message); },
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
			onSuccess: async ({ data, message }) => {
				queryClient.setQueryData('airport-success', message);
				let updatedData = queryClient.getQueryData('global-airport') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== deleteId
				})
				queryClient.setQueryData('global-airport', updatedData);
				deleteId = '';
			},
			onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-airport') || [];
	const successMessage = queryClient.getQueryData('airport-success');
	const errorMessage = queryClient.getQueryData('airport-error');

	return {
		getGlobalAirport,
		postGlobalAirport,
		patchGlobalAirport,
		deleteGlobalAirport,
		updatedData,
		successMessage,
		errorMessage
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
	let variables = '';
	const getGlobalAircraftType = useMutation({
		mutationKey: ['global-aircraft-type'],
		mutationFn: async (props) => {
			variables = props;
			if (props?.bulk) {
				return await Post(`${GET_GLOBAL_AIRCRAFT_TYPE}?bulk=true`)
			} else {
				return await Post(`${GET_GLOBAL_AIRCRAFT_TYPE}`, props)
			}
		},
		onSuccess: (newData) => {
			console.log("variables are ", variables)
			if (variables?.bulk) {
				const updatedData = newData.data;
				queryClient.setQueryData('global-aircraft-type', updatedData);
			} else {
				const previousData = queryClient.getQueryData('global-aircraft-type') || [];
				const updatedData = [...previousData, ...newData.data];
				queryClient.setQueryData('global-aircraft-type', updatedData);
			}
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
		...props,
	});
	//for create new aircraft type
	const postGlobalAirCraftType = useMutation({
		mutationKey: ['post-global-aircraft-type'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
		onSuccess: ({ data, message }) => {
			console.log("post data is ", data);
			queryClient.setQueryData('aircraft-type-success', message);
			delete data.createdBy;
			const previousData = queryClient.getQueryData('global-aircraft-type') || [];
			const updatedData = [data, ...previousData];
			queryClient.setQueryData('global-aircraft-type', updatedData);
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
	const deleteGlobalAircraftType = useMutation(
		{
			mutationKey: ['delete-global-aircraft-type'],
			mutationFn: async (id) => {
				return await Delete(`${DELETE_GLOBAL_AIRCRAFT_TYPE}${id}`);
			},
			onSuccess: async ({ data, message }) => {
				queryClient.setQueryData('aircraft-type-success', message);
				let updatedData = queryClient.getQueryData('global-aircraft-type') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== data.id
				})
				queryClient.setQueryData('global-aircraft-type', updatedData);
				if (updatedData.length === 0) {
					getGlobalAircraftType.mutate();
				}
			},
			onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('aircraft-type-error', message); },
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-type') || [];
	const successMessage = queryClient.getQueryData('aircraft-type-success');
	const errorMessage = queryClient.getQueryData('aircraft-type-error');
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
		onSuccess: ({ data, message }) => {
			queryClient.setQueryData('aircraft-register-success', message);
			delete data.createdBy;
			const previousData = queryClient.getQueryData('global-aircraft-register') || [];
			const updatedData = [data, ...previousData];
			queryClient.setQueryData('global-aircraft-register', updatedData);
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
			let updatedData = queryClient.getQueryData('global-aircraft-register') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-aircraft-register', updatedData);
		},
		onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
		...props,
	});
	//for delete an aircraft registration
	const deleteGlobalAircraftRegistration = useMutation(
		{
			mutationKey: ['delete-global-aircraft-register'],
			mutationFn: async (id) => {
				return await Delete(`${DELETE_GLOBAL_AIRCRAFT_REGISTRATION}${id}`);
			},
			onSuccess: async ({ data, message }) => {
				queryClient.setQueryData('aircraft-register-success', message);
				let updatedData = queryClient.getQueryData('global-aircraft-register') || [];
				updatedData = updatedData.filter((elm) => {
					return elm.id !== data.id
				})
				queryClient.setQueryData('global-aircraft-register', updatedData);
				if (updatedData.length === 0) {
					getGlobalAircraftRegistration.mutate();
				}
			},
			onError: ({ response: { data: { message } } }) => queryClient.setQueryData('aircraft-register-error', message),
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-register') || [];
	const successMessage = queryClient.getQueryData('aircraft-register-success');
	const errorMessage = queryClient.getQueryData('aircraft-register-error');

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
		onSuccess: ({ message, data }) => {
			queryClient.setQueryData('airline-success', message);
			delete data.createBy;
			const previousData = queryClient.getQueryData('global-airline') || [];
			const updatedData = [data, ...previousData];
			queryClient.setQueryData('global-airline', updatedData);
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
	const deleteGlobalAirline = useMutation({
		mutationKey: ['delete-global-airline'],
		mutationFn: async (id) => {
			return await Delete(`${DELETE_GLOBAL_AIRLINE}${id}`);
		},
		onSuccess: async ({ data, message }) => {
			queryClient.setQueryData('airline-success', message);
			let updatedData = queryClient.getQueryData('global-airline') || [];
			updatedData = updatedData.filter((elm) => {
				return elm.id !== data.id
			})
			queryClient.setQueryData('global-airline', updatedData);
			if (updatedData.length === 0) {
				getGlobalAirline.mutate();
			}
		},
		onError: ({ response: { data: { message } } }) => { queryClient.setQueryData('airline-error', message); },
		...props,
	});
	const updatedData = queryClient.getQueryData('global-airline') || [];
	const successMessage = queryClient.getQueryData('airline-success');
	const errorMessage = queryClient.getQueryData('airline-error');
	return { getGlobalAirline, postGlobalAirline, patchGlobalAirline, deleteGlobalAirline, updatedData, successMessage, errorMessage }
};

export const useGlobalCountries = (props) => {
	const queryClient = useQueryClient();
	const getGlobalCountries = useMutation({
		mutationKey: ['get-country-data'],
		mutationFn: async () => await Get(`${GET_COUNTRY_DATA}`),
		onSuccess: (data) => {
			queryClient.setQueryData('country-data', data); // Set the data in the cache
		},
		...props
	});
	const countryData = queryClient.getQueryData('country-data') || [];
	return { getGlobalCountries, countryData }
}