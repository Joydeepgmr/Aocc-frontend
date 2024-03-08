import React from 'react';
import PropTypes from 'prop-types';
import { Table, Empty } from 'antd';
import './table.scss';

const TableComponent = ({
    columns,
    data = [],
    loading = false,
    onChange = () => {}, 
    tableTitle = '', 
    emptyText = 'No data available' 
}) => {

    const handleTableChange = (pagination, filters, sorter) => {
        const sortField = sorter?.field;
        const sortOrder = sorter?.order;
        
        onChange({
            sortField,
            sortOrder,
            pagination,
            ...filters,
        });
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                onChange={handleTableChange}
                locale={{
                    emptyText: <Empty description={emptyText} />
                }}
                pagination={false}
            />
        </>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    tableTitle: PropTypes.string,
    emptyText: PropTypes.string
};

export default TableComponent;
