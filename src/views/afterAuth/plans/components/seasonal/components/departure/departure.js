import React from 'react';
import './departure.scss';
import TableComponent from '../../../../../../../components/table/table';

const Departure = ({data, columns, fetchData, pagination}) => {

    return (
        <div className="main">
            <div>
				<TableComponent {...{ data, columns, fetchData, pagination }} />
			</div>
        </div>
    );
};

export default Departure;
