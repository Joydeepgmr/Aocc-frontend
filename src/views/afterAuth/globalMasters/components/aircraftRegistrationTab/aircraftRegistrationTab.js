import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAircraftRegistration, useGlobalAircraftTypeDropdown } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import CreateWrapper from '../createWrapper/createWrapper';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { GET_GLOBAL_AIRCRAFT_REGISTRATION } from '../../../../../api';

const AircraftRegistrationTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: aircraftTypeDropdownData } = useGlobalAircraftTypeDropdown({ onError });
    const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch: getAircraftRegistrationRefetch } = useGetGlobalAircraftRegistration({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <>
            <SocketEventListener refetch={getAircraftRegistrationRefetch} apiName={GET_GLOBAL_AIRCRAFT_REGISTRATION} />
            <CreateWrapper
                width="80%"
                tableComponent={<AircraftRegistrationTable
                    data={data}
                    createProps={createProps}
                    setCreateProps={setCreateProps}
                    fetchData={fetchNextPage}
                    pagination={hasNextPage}
                    loading={isFetching}
                    aircraftTypeDropdownData={aircraftTypeDropdownData}
                />}
                data={data?.pages}
                createProps={createProps}
                setCreateProps={setCreateProps}
                label='New Aircraft Registration'
                isLoading={isLoading}
                isCsv={false}
            />
        </>
    )
}

export default AircraftRegistrationTab;