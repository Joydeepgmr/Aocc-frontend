import React from 'react';
// import './departure.scss';
import TableComponent from '../../../../../../../components/table/table';

const Departure = ({ data, columns, fetchData, pagination }) => {

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter);
    };

    return (
        <div className="main">
            <div>
                <TableComponent {...{ data, columns, fetchData, pagination, isColored: true }} />            </div>
        </div>
    );
};

export default Departure;
