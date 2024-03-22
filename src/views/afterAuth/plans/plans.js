import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Seasonal from './components/seasonal/seasonal';
import CDM from './components/CDM/CDM';
import { addArrival } from './redux/planReducer';
import './plans.scss';

const Plans = () => {
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState("seasonal");

    const planTabItems = [
        {
            key: '1',
            label: 'Seasonal',
            children: <Seasonal action={addArrival} tab = {tab}/>,
        },
        {
            key: '2',
            label: 'Daily Schedule',
            children: <CDM tab={tab}/>,
        },
    ];

    const handleChange = (key) => {
        setIndex(key);
        key === '1' && setTab('seasonal');
		key === '2' && setTab('dailyOps');
    };

    return (
        <>
            <div className="box">
                <div>
                    <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">Operational Planning</CustomTypography>
                    <CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">Data for seasonal and daily operations of aircrafts</CustomTypography>
                </div>
                <CustomTabs defaultActiveKey={tab} items={planTabItems} onChange={handleChange} type="card" />
            </div>
        </>
    );
};

export default Plans;
