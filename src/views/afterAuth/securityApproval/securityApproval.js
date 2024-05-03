import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Pending from './pending/pending';
import Rejected from './rejected/rejected';
import Approved from './approved/approved';
import { useGetUser } from '../../../services/securityApproval/securityApproval';
import './securityApproval.scss';
import Input from '../../../components/input/field/field';

const SecurityApproval = () => {
	const [userData, setUserData] = useState([]);
	const [tab, setTab] = useState('in-process');
	const getUserHandler = {
		onSuccess: (data) => handleGetUserSuccess(data),
		onError: (error) => handleGetUserError(error),
	};

	const handleGetUserSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data?.userList?.data || []);
			}, []);

			setUserData([...newData]);
		}
	};

	const handleGetUserError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const {
		data: fetchUser,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetUser(tab, getUserHandler);

	const approvalTabItems = [
		{
			key: '1',
			label: 'Pending',
			children: (
				<Pending
					data={userData}
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					loading={isFetchLoading || isFetching}
				/>
			),
		},
		{
			key: '2',
			label: 'Approved',
			children: (
				<Approved
					data={userData}
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					loading={isFetchLoading || isFetching}
				/>
			),
		},
		{
			key: '3',
			label: 'Rejected',
			children: (
				<Rejected
					data={userData}
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					loading={isFetchLoading || isFetching}
				/>
			),
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
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
					Hi There!
				</CustomTypography>
				<CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">
					Here are the awaiting approvals
				</CustomTypography>
			</div>
			<CustomTabs
				defaultActiveKey={tab}
				items={approvalTabItems}
				onChange={handleChange}
				type="simple"
				className="tabs--custom_tab"
				extraContent={
					<div style={{ marginBottom: '2rem' }}>
						<Input
							label="search"
							name="search"
							placeholder="Search"
							warning="Required field"
							type="search"
						/>
					</div>
				}
			/>
		</div>
	);
};

export default SecurityApproval;
