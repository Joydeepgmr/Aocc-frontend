import React from 'react';
import PropTypes from 'prop-types';
import { Table, Empty } from 'antd';
import './table.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const TableComponent = ({
    columns,
    data = [],
    loading = false,
    onChange = () => { },
    tableTitle = '',
    emptyText = 'No data available',
    fetchData,
    pagination,
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

    console.log(data, "dattaaa");

    return (
        <>
            {fetchData ?
                <InfiniteScroll
                    dataLength={data.length} // This is important to determine when to fetch more data
                    next={fetchData} // Function to call when reaching the end of the list
                    hasMore={pagination?.isMore ?? pagination} // Boolean to indicate if there is more data to load
                    scrollThreshold={0.8}
                >
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
                </InfiniteScroll >
                : <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    onChange={handleTableChange}
                    locale={{
                        emptyText: <Empty description={emptyText} />
                    }}
                    pagination={false}
                />
            }
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
