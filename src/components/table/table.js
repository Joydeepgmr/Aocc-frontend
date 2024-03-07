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

    // Function to handle table change events (pagination, filtering, sorting)
    const handleTableChange = (pagination, filters, sorter) => {
        // Extract sortField and sortOrder from sorter object
        const sortField = sorter?.field;
        const sortOrder = sorter?.order;
        
        // Call onChange prop with updated table state
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
