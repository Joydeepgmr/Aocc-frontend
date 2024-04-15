import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Pending from './pending/pending';
import Rejected from './rejected/rejected';
import Approved from './approved/approved';
import './securityApproval.scss';
import { useGetUser } from '../../../services/securityApproval/securityApproval';
import toast from 'react-hot-toast';

const SecurityApproval = () => {
    //const [index, setIndex] = useState(0);
    const [tab, setTab] = useState("in-process");
    const getUserHandler = {
		onSuccess: (data) => handleGetUserSuccess(data),
		onError: (error) => handleGetUserError(error),
	};

	const handleGetUserSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setUserData([...newData]);
		}
	};

	const handleGetUserError = (error) => {
		toast.error(error?.message);
	};
	const {
		data: fetchUser,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetUser(tab,getUserHandler);

    const rows = [
		{
            "id": "8b6f9395-c685-4f03-bf18-5ac0ced6a281",
            "createdAt": "2024-04-12T05:24:06.047Z",
            "updatedAt": "2024-04-13T12:43:34.734Z",
            "name": "Shubham Kaushik",
            "email": "Shubham.k@antino.com",
            "status": "approved",
            "dob": "2024-03-07",
            "image": "https://storage.googleapis.com/gmr-aos-bucket/8b6f9395-c685-4f03-bf18-5ac0ced6a281/file-1713159635282.png",
            "approveBy": "00ae4504-bf4c-4921-adac-08549fc1885e",
            "matchPercentage": 98,
            "otp": 2016,
            "customerDocuments": [
                {
                    "id": "72b6782a-a227-4b55-b722-8b78ea07206b",
                    "createdAt": "2024-04-12T17:21:42.680Z",
                    "updatedAt": "2024-04-12T17:21:42.680Z",
                    "documentUrl": "https://storage.googleapis.com/gmr-aos-bucket/8b6f9395-c685-4f03-bf18-5ac0ced6a281/file-1713160835381.png",
                    "type": "passport"
                },
                {
                    "id": "5d73f393-8c0a-4af6-a9e0-1756e2d31011",
                    "createdAt": "2024-04-13T12:44:12.286Z",
                    "updatedAt": "2024-04-13T12:44:12.286Z",
                    "documentUrl": "myDoc",
                    "type": "kpt"
                },
                {
                    "id": "fcab9c95-5350-4d7e-a435-d29e0b4859a9",
                    "createdAt": "2024-04-13T12:47:12.466Z",
                    "updatedAt": "2024-04-13T12:47:12.466Z",
                    "documentUrl": "myDoc",
                    "type": "kpt"
                },
                {
                    "id": "f3c3ee8e-bddb-4287-a1b4-8c9519adde32",
                    "createdAt": "2024-04-13T12:53:22.704Z",
                    "updatedAt": "2024-04-13T12:53:22.704Z",
                    "documentUrl": "myDocTest",
                    "type": "kpt"
                },
                {
                    "id": "7ef41e69-e758-4a61-a19a-b6459a9c1053",
                    "createdAt": "2024-04-13T12:54:58.186Z",
                    "updatedAt": "2024-04-13T12:54:58.186Z",
                    "documentUrl": "myDocTest1",
                    "type": "kpt"
                }
            ]
        },
	];

    const approvalTabItems = [
        {
            key: '1',
            label: 'Pending',
            children: <Pending data={rows} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>,
        },
        {
            key: '2',
            label: 'Approved',
            children: <Approved data={rows} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>,
        },
        {
            key: '3',
            label: 'Rejected',
            children: <Rejected data={rows} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>,
        },
    ];

    const handleChange = (key) => {
        key === '1' && setTab('in-process');
		key === '2' && setTab('approved');
        key === '3' && setTab('rejected');
    };

    return (
            <div className="tabs--box">
                <div>
                    <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">Hi There!</CustomTypography>
                    <CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">Here are the awaiting approvals</CustomTypography>
                </div>
             <CustomTabs defaultActiveKey={tab} items={approvalTabItems} onChange={handleChange} type="simple" className="tabs--custom_tab"/>
            </div>
    );
};

export default SecurityApproval;
