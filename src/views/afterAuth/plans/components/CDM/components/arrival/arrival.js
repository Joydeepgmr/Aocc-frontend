import React from 'react';
// import './arrival.scss';
import TableComponent from '../../../../../../../components/table/table';

const Arrival = ({ data, columns }) => {

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter);
    };

    return (
        <div className="main">
            <div>
                <TableComponent columns={columns} data={data} onChange={handleTableChange} />
            </div>
        </div>
    );
};

export default Arrival;
