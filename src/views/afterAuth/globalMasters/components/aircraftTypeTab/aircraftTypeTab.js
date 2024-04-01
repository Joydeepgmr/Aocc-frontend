import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAircraftType, useGlobalAirlineDropdown } from '../../../../../services/globalMasters/globalMaster';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';

const AircraftTypeTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: airlineDropdownData = [] } = useGlobalAirlineDropdown({ onError });
    const { data, isLoading, hasNextPage, fetchNextPage } = useGetGlobalAircraftType({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function onUpload() {

    }
    function onDownload() {

    }
    return (
        <>
            <CreateWrapper
                width="120rem"
                tableComponent={<AircraftTypeTable
                    data={data}
                    createProps={createProps}
                    setCreateProps={setCreateProps}
                    fetchData={fetchNextPage}
                    pagination={hasNextPage}
                    airlineDropdownData={airlineDropdownData}
                />}
                data={data?.pages}
                createProps={createProps}
                setCreateProps={setCreateProps}
                label='New Aircraft Type'
                isLoading={isLoading}
            />
        </>
    )
}

export default AircraftTypeTab;