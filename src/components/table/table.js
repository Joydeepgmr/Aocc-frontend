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
    const hasMoreData = pagination?.isMore ?? pagination;
    return (
        <>
            {fetchData ?
                <InfiniteScroll
                    dataLength={data.length} // This is important to determine when to fetch more data
                    next={!loading && fetchData} // Function to call when reaching the end of the list
                    hasMore={hasMoreData} // Boolean to indicate if there is more data to load
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        bordered
                        onChange={handleTableChange}
                        locale={{
                            emptyText: <Empty description={emptyText} />
                        }}
                        pagination={false}
                    />
                    {loading && hasMoreData ? <h6>Loading...</h6> : null}
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
