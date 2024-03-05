import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import { items } from './plansData';
import './plans.scss';


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
                <CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} type="card" />
            </div>
        </>
    );
};

export default Plans;
