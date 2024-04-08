import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAirport } from '../../../../../services/globalMasters/globalMaster';
import AirportTable from '../airportTable/airportTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AirportTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data, isFetching, hasNextPage, fetchNextPage } = useGetGlobalAirport({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <CreateWrapper
            width="80%"
            tableComponent={<AirportTable
                data={data}
                createProps={createProps}
                setCreateProps={setCreateProps}
                fetchData={fetchNextPage}
                pagination={hasNextPage}
                loading={isFetching}
            />}
            data={data?.pages}
            createProps={createProps}
            setCreateProps={setCreateProps}
            label='New Airport'
            isLoading={isFetching}
        />
    )
}

export default AirportTab;