import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCountriesDropdown, useGetGlobalAircraftRegistration, useGlobalAircraftTypeDropdown, useGlobalAirportDropdown } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AircraftRegistrationTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: airportDropdownData } = useGlobalAirportDropdown({ onError });
    const { data: aircraftTypeDropdownData } = useGlobalAircraftTypeDropdown({ onError });
    const { data: countryDropdownData } = useCountriesDropdown({ onError });
    const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetGlobalAircraftRegistration({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <>
            <CreateWrapper
                width="80%"
                tableComponent={<AircraftRegistrationTable
                    data={data}
                    createProps={createProps}
                    setCreateProps={setCreateProps}
                    fetchData={fetchNextPage}
                    pagination={hasNextPage}
                    loading={isFetching}
                    airportDropdownData={airportDropdownData}
                    aircraftTypeDropdownData={aircraftTypeDropdownData}
                    countryDropdownData={countryDropdownData}
                />}
                data={data?.pages}
                createProps={createProps}
                setCreateProps={setCreateProps}
                label='New Aircraft Registration'
                isLoading={isLoading}
            />
        </>
    )
}

export default AircraftRegistrationTab;