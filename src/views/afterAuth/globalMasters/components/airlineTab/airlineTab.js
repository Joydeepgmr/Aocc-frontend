import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCountriesDropdown, useGetGlobalAirline, useGlobalAirportDropdown } from '../../../../../services/globalMasters/globalMaster';
import AirlineTable from '../airlineTable/airlineTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AirlineTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: countryDropdownData = [] } = useCountriesDropdown({ onError });
    const { data: airportDropdownData = [] } = useGlobalAirportDropdown({ onError });
    const { data = [], isLoading, mutate: getAirlineData, ...rest } = useGetGlobalAirline({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function fetchAirlineData() {
        const payload = { pagination: data?.pagination }
        getAirlineData(payload);
    }
    function onUpload() {

    }
    function onDownload() {

    }
    useEffect(() => {
        getAirlineData();
    }, [])
    return (
        <CreateWrapper
            width="120rem"
            tableComponent={<AirlineTable
                data={data?.data}
                fetchData={fetchAirlineData}
                pagination={data?.pagination}
                {...{ createProps, setCreateProps, countryDropdownData, airportDropdownData }}
            />}
            data={data?.data}
            createProps={createProps}
            setCreateProps={setCreateProps}
            label="New Airline"
            isLoading={isLoading}
        />
    )
}

export default AirlineTab;