import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAirport } from '../../../../../services/globalMasters/globalMaster';
import AirportTable from '../airportTable/airportTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AirportTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data = [], isLoading, mutate: getAirportData, ...rest } = useGetGlobalAirport({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function fetchAirportData() {
        const payload = { pagination: data?.pagination }
        getAirportData(payload);
    }
    function onUpload() {

    }
    function onDownload() {

    }
    useEffect(() => {
        getAirportData();
    }, [])
    return (
        <CreateWrapper
            width="120rem"
            tableComponent={<AirportTable
                data={data?.data}
                createProps={createProps}
                setCreateProps={setCreateProps}
                fetchData={fetchAirportData}
                pagination={data?.pagination}
            />}
            data={data?.data}
            createProps={createProps}
            setCreateProps={setCreateProps}
            label='New Airport'
            isLoading={isLoading}
        />
    )
}

export default AirportTab;