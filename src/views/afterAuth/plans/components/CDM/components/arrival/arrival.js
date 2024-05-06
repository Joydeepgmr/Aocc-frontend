import React from 'react';
// import './arrival.scss';
import TableComponent from '../../../../../../../components/table/table';

const Arrival = ({ data, columns, fetchData, pagination }) => {

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter);
    };

    return (
        <div className="main">
            <div>
                <TableComponent {...{ data, columns, fetchData, pagination, isColored: true }} />
            </div>
        </div>
    );
};

export default Arrival;
