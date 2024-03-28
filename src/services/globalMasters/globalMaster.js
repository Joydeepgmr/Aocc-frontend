import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
	GET_GLOBAL_AIRPORT,
	POST_GLOBAL_AIRPORT,
	EDIT_GLOBAL_AIRPORT,
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
} from '../../api/endpoints';

import { Get, Post, Patch, Delete } from '../HttpServices/HttpServices';

// export const useGetGlobalAirport = (props) => {
// 	const response = useQuery({
// 		queryKey: ['global-airport'],
// 		queryFn: async () => await Get(`${GET_GLOBAL_AIRPORT}`),
// 		...props,
// 	});

// 	const { data, error, isSuccess } = response;

// 	console.log(response);

// 	const statusMessage = isSuccess ? data?.message : error?.message;

// 	return {
// 		...response,
// 		data: data,
// 		message: statusMessage,
// 	};
// };

export const useGetGlobalAirport = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['global-airport'],
		mutationFn: async (props) => await Post(`${GET_GLOBAL_AIRPORT}`, props),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const usePostGlobalAirport = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-airport');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditGlobalAirport = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-global-airport'],
		mutationFn: (data) => Patch(`${EDIT_GLOBAL_AIRPORT}/${id}`, data),
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
			console.log("on get success")
			const previousData = queryClient.getQueryData('global-aircraft-type') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-aircraft-type', updatedData);
		},
		...props,
	});
	if (props == 'get') {
		return { getGlobalAircraftType }
	}
	//for create new aircraft type
	const postGlobalAirCraftType = useMutation({
		mutationKey: ['post-global-aircraft-type'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
		onSuccess: () => {
			console.log("on post success")
		},
		...props,
	});
	// for edit an aircraft type
	const patchGlobalAircraftType = useMutation({
		mutationKey: ['patch-global-aircraft-type'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_TYPE}${payload.id}`, payload.values),
		onSuccess: ({ data }) => {
			console.log("on patch success")
			let updatedData = queryClient.getQueryData('global-aircraft-type') || [];
			updatedData = updatedData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			queryClient.setQueryData('global-aircraft-type', updatedData);
		},
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
			onSuccess: async ({ data }) => {
				console.log("on delete success")
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
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-type') || [];
	// const { data, error, isSuccess } = response;
	// const statusMessage = isSuccess
	// 	? data?.message
	// 	: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;
	return {
		getGlobalAircraftType,
		postGlobalAirCraftType,
		patchGlobalAircraftType,
		deleteGlobalAircraftType,
		updatedData
	};
};
// export const useDeleteGlobalAircraftType = (props) => {
// 	const queryClient = useQueryClient();

// 	const response = useMutation(
// 		{
// 			mutationKey: ['delete-global-aircraft-type'],
// 			mutationFn: async (id) => {
// 				const response = await Delete(`${DELETE_GLOBAL_AIRCRAFT_TYPE}${id}`);
// 				return response.data; // Assuming the API returns a success message or updated data
// 			},
// 			onSuccess: async () => {
// 				queryClient.invalidateQueries('global-aircraft-type');
// 			},
// 			...props,
// 		}
// 	);
// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };

// export const usePostGlobalAircraftType = (props) => {
// 	const queryClient = useQueryClient()

// 	const response = useMutation({
// 		mutationKey: ['post-global-aircraft-type'],
// 		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(['global-aircraft-type']);
// 		},
// 		...props,
// 	});

// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };


// export const usePatchGlobalAircraftType = (props) => {
// 	const queryClient = useQueryClient()
// 	const response = useMutation({
// 		mutationKey: ['patch-global-aircraft-type'],
// 		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_TYPE}${payload.id}`, payload.values),
// 		onSuccess: (data) => {
// 			queryClient.invalidateQueries('global-aircraft-type');
// 		},
// 		...props,
// 	});

// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };

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
		...props,
	});
	//for create new aircraft registration
	const postGlobalAircraftRegistration = useMutation({
		mutationKey: ['post-global-aircraft-register'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		// onSuccess: () => {
		// 	queryClient.invalidateQueries(['global-aircraft-register']);
		// },
		...props,
	});
	// for edit an aircraft registration
	const patchGlobalAircraftRegistration = useMutation({
		mutationKey: ['patch-global-aircraft-register'],
		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		// onSuccess: ({ data }) => {
		// 	let updatedData = queryClient.getQueryData('global-aircraft-register') || [];
		// 	updatedData = updatedData.map((elm) => {
		// 		if (elm.id === data.id) {
		// 			return data;
		// 		}
		// 		return elm;
		// 	})
		// 	queryClient.setQueryData('global-aircraft-register', updatedData);
		// },
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
			onSuccess: async ({ data }) => {
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
			...props,
		}
	);
	const updatedData = queryClient.getQueryData('global-aircraft-register') || [];
	// const { data, error, isSuccess } = response;
	// const statusMessage = isSuccess
	// 	? data?.message
	// 	: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return {
		getGlobalAircraftRegistration,
		postGlobalAircraftRegistration,
		patchGlobalAircraftRegistration,
		deleteGlobalAircraftRegistration,
		updatedData,
	};
};


// export const usePostGlobalAircraftRegistration = (props) => {
// 	const queryClient = useQueryClient()

// 	const response = useMutation({
// 		mutationKey: ['post-global-aircraft-register'],
// 		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries('global-aircraft-register');
// 		},
// 		...props,
// 	});

// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };

// export const useDeleteGlobalAircraftRegistration = (props) => {
// 	const queryClient = useQueryClient();

// 	const response = useMutation(
// 		{
// 			mutationKey: ['delete-global-aircraft-register'],
// 			mutationFn: async (id) => {
// 				const response = await Delete(`${DELETE_GLOBAL_AIRCRAFT_REGISTRATION}${id}`);
// 				return response.data; // Assuming the API returns a success message or updated data
// 			},
// 			onSuccess: () => {
// 				queryClient.invalidateQueries('global-aircraft-register');
// 			},
// 			...props,
// 		}
// 	);
// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };

// export const usePatchGlobalAircraftRegistration = (props) => {
// 	const queryClient = useQueryClient()
// 	const response = useMutation({
// 		mutationKey: ['patch-global-aircraft-register'],
// 		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
// 		onSuccess: (data) => {
// 			console.log("data on succes is ", data);
// 			queryClient.invalidateQueries('global-aircraft-register');
// 		},
// 		...props,
// 	});

// 	const { data, error, isSuccess } = response;

// 	const statusMessage = isSuccess
// 		? data?.message
// 		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

// 	return { ...response, data, message: statusMessage };
// };
export const useGetGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['global-airline'],
		mutationFn: async () => await Post(`${GET_GLOBAL_AIRLINE}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	console.log(response);

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const usePostGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-airline'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRLINE}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const usePatchGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['patch-global-airline'],
		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRLINE}`, props),

		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useDeleteGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['delete-global-airline'],
		mutationFn: async (props) => await Delete(`${DELETE_GLOBAL_AIRLINE}`, props),

		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};
