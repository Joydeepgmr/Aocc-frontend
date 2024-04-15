import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Seasonal from './components/seasonal/seasonal';
import CDM from './components/CDM/CDM';
import { addArrival } from './redux/planReducer';
import './plans.scss';
import TopHeader from '../../../components/topHeader/topHeader';

const Plans = () => {
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState("seasonal");

    const planTabItems = [
        {
            key: '1',
            label: 'Seasonal',
            children: <Seasonal action={addArrival} tab={tab} />,
        },
        {
            key: '2',
            label: 'Daily Schedule',
            children: <CDM tab={tab} />,
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
            <TopHeader heading='Operational Planning' subHeading='Data for seasonal and daily operations of aircrafts.' />
                <CustomTabs defaultActiveKey={tab} items={planTabItems} onChange={handleChange} type="card" destroyInactiveTabPane={false} />
            </div>
        </>
    );
};

export default Plans;
