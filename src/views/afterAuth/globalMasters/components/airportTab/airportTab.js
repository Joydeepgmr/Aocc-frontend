import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAirport } from '../../../../../services/globalMasters/globalMaster';
import AirportTable from '../airportTable/airportTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AirportTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data, isLoading, hasNextPage, fetchNextPage } = useGetGlobalAirport({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <CreateWrapper
            width="120rem"
            tableComponent={<AirportTable
                data={data}
                createProps={createProps}
                setCreateProps={setCreateProps}
                fetchData={fetchNextPage}
                pagination={hasNextPage}
            />}
            data={data?.pages}
            createProps={createProps}
            setCreateProps={setCreateProps}
            label='New Airport'
            isLoading={isLoading}
        />
    )
}

export default AirportTab;