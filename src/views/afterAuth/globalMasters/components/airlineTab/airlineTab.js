import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCountriesDropdown, useGetGlobalAirline, useGlobalAirportDropdown } from '../../../../../services/globalMasters/globalMaster';
import AirlineTable from '../airlineTable/airlineTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AirlineTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: countryDropdownData = [] } = useCountriesDropdown({ onError });
    const { data: airportDropdownData = [] } = useGlobalAirportDropdown({ onError });
    const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetGlobalAirline({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <CreateWrapper
            width="80%"
            tableComponent={<AirlineTable
                data={data}
                fetchData={fetchNextPage}
                pagination={hasNextPage}
                loading={isFetching}
                {...{ createProps, setCreateProps, countryDropdownData, airportDropdownData }}
            />}
            data={data?.pages}
            createProps={createProps}
            setCreateProps={setCreateProps}
            label="New Airline"
            isLoading={isLoading}
        />
    )
}

export default AirlineTab;