import React from 'react';
import './plan.scss';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import Button from '../../../components/button/button';

const Plan = () => {

    return (
        <div className='plan_container'>
            <div className='plan_heading'>
                <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Operational Planning"} />
                <CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296" children={"Data for seasonal and daily operations of aircrafts"} />
            </div>

            <div className='plan_tab'>

            </div>

            <div className='plan_main'>
                <Button onClick={() => {
                    alert('Filled button');
                }} title="Create" type='filledText' className={'custom_createButton'} />
                <Button onClick={() => {
                    alert('Filled button');
                }} title="Upload CSV" type='filledText' className={'custom_SVGbutton'} />
                <Button onClick={() => {
                    alert('Filled button');
                }} title="Download CSV Template" type='filledText' className={'custom_SVGDownload'} />
            </div>
        </div>
    );
};

export default Plan;
