import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import Filter from '../../../../../assets/Filter.svg';
import './seasonalTable.scss';


const SeasonalTable = () => {

    return (
        <div className="main">
            <div className='top_container'>
                <div>
                    <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
                        Flight Schedule Planning
                    </CustomTypography>
                </div>
                <div className='button_container'>
                    <Button onClick={() => {
                        alert('Icon Button with Border');
                    }}
                        type="iconWithBorder"
                        className={'custom_filter'}
                        icon={Filter}
                        alt="arrow icon"
                    />
                    <Button onClick={() => {
                        alert('Icon Button with Border');
                    }}
                        type="iconWithBorder"
                        className={'custom_filter'}
                        icon={Filter}
                        alt="arrow icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default SeasonalTable;
