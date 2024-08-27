import React from 'react';
// import './arrival.scss';
import TableComponent from '../../../../../../../components/table/table';

const Arrival = ({ data, columns, fetchData, pagination, loading }) => {

    const handleTableChange = (pagination, filters, sorter) => {
    };

    return (
        <div className="main">
            <div>
                <TableComponent {...{ data, columns, fetchData, pagination, loading, isColored: true }} />
            </div>
        </div>
    );
};

export default Arrival;
