import React, { useEffect, useState } from 'react';
import './arrival.scss';
import TableComponent from '../../../../../../../components/table/table';

const Arrival = ({data,columns, fetchData, pagination}) => {

    return (
        <div className="main">
            <div>    
				<TableComponent {...{ data, columns, fetchData, pagination,isColored:true }} />
			</div>
        </div>
    );
};

export default Arrival;
