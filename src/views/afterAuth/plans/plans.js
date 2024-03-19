import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import Seasonal from './components/seasonal/seasonal';
import CDM from './components/CDM/CDM';
import { addArrival } from './redux/planReducer';
import './plans.scss';


export const planTabItems = [
    {
        key: '1',
        label: 'Seasonal',
        children: <Seasonal action={addArrival} />,
    },
    {
        key: '2',
        label: 'Daily Schedule',
        children: <CDM />,
    },
];


const Plans = () => {
    const [index, setIndex] = useState(0);

    const handleChange = (key) => {
        setIndex(key);
    };

    return (
        <>
            <div className="box">
                <div>
                    <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">Operational Planning</CustomTypography>
                    <CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">Data for seasonal and daily operations of aircrafts</CustomTypography>
                </div>
                <CustomTabs defaultActiveKey="1" items={planTabItems} onChange={handleChange} type="card" />
            </div>
        </>
    );
};

export default Plans;
