import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAircraftType, useGetGlobalAircraftTypePaginated, useGlobalAirlineDropdown } from '../../../../../services/globalMasters/globalMaster';
import CreateWrapper from '../createWrapper/createWrapper';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';

const AircraftTypeTab = () => {
    const onError = ({ response: { data: { message } } }) => toast.error(message);
    const { data: airlineDropdownData = [] } = useGlobalAirlineDropdown({ onError });
    // const { data = [], isLoading, mutate: getAircraftTypeData, ...rest } = useGetGlobalAircraftType({ onError });
    const scrollData = useGetGlobalAircraftTypePaginated({ onError });
    const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
    function fetchAircraftTypeData() {
        const payload = { pagination: data?.pagination }
        getAircraftTypeData(payload);
    }
    function onUpload() {

    }
    function onDownload() {

    }
    console.log('getNextPageParam paginatedQuery data is ', scrollData);
    const data = {};
    return (
        <>
            <CreateWrapper
                width="120rem"
                tableComponent={<AircraftTypeTable
                    data={scrollData?.data}
                    createProps={createProps}
                    setCreateProps={setCreateProps}
                    fetchData={scrollData?.fetchNextPage}
                    pagination={{ isMore: scrollData?.hasNextPage }}
                    airlineDropdownData={airlineDropdownData}
                />}
                data={scrollData?.data?.pages}
                createProps={createProps}
                setCreateProps={setCreateProps}
                label='New Airport'
                isLoading={scrollData.isLoading}
            />
            <button onClick={scrollData?.fetchNextPage} style={{ zIndex: 100, position: 'absolute', top: '140%' }}>Load more data </button>
        </>
    )
}

export default AircraftTypeTab;