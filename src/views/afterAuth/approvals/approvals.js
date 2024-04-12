import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Pending from './pending/pending';
import Rejected from './rejected/rejected';
import './approvals.scss';
import Approved from './approved/approved';

const Approval = () => {
    //const [index, setIndex] = useState(0);
    const [tab, setTab] = useState("pending");

    const approvalTabItems = [
        {
            key: '1',
            label: 'Pending',
            children: <Pending tab = {tab}/>,
        },
        {
            key: '2',
            label: 'Approved',
            children: <Approved tab={tab}/>,
        },
        {
            key: '3',
            label: 'Rejected',
            children: <Rejected tab={tab}/>,
        },
    ];

    const handleChange = (key) => {
        key === '1' && setTab('pending');
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

export default Approval;
