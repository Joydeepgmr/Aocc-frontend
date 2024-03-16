import React, { useState } from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/input/field/field';
import Button from '../../../../components/button/button';
import Filter from '../../../../assets/Filter.svg'
import './style.scss';

const FlightSchedule = () => {
    const [loading, setLoading] = useState(false);
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter);
    };

    const columns = [
        { title: 'Flight', dataIndex: 'flight', key: 'flight' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'ORG', dataIndex: 'org', key: 'org' },
        { title: 'VIA', dataIndex: 'via', key: 'via' },
        { title: 'STA', dataIndex: 'sta', key: 'sta' },
        { title: 'ETA', dataIndex: 'eta', key: 'eta' },
        { title: 'TMO', dataIndex: 'tmo', key: 'tmo' },
        { title: 'ATA', dataIndex: 'ata', key: 'ata' },
        { title: 'RNY', dataIndex: 'rny', key: 'rny' },
        { title: 'EOB', dataIndex: 'eob', key: 'eob' },
        { title: 'ONB', dataIndex: 'onBlock', key: 'onBlock' },
        { title: 'POS', dataIndex: 'pos', key: 'pos' },
        { title: 'Gate', dataIndex: 'gate', key: 'gate' },
        { title: 'Belt', dataIndex: 'belt', key: 'belt' },
        { title: 'AC/ REGN', dataIndex: 'acRegn', key: 'acRegn' },
        { title: 'Call Sign', dataIndex: 'cs', key: 'cs' },
        { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
    ];
    const dummyData = [
        {
            flight: 'AI 812',
            status: 'Airborne',
            org: 'Delhi',
            via: 'ST | HYD | DEL',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
        {
            flight: '6E 6172',
            status: 'Landed',
            org: 'Surat',
            via: 'ST',
            sta: '13:00',
            eta: '13:30',
            tmo: '13:45',
            ata: '14:00',
            rny: 'Stand 1',
            eob: '14:15',
            onBlock: '11:30',
            pos: 'Stand 2',
            gate: 'Gate B',
            belt: '6',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-780',
        },
        {
            flight: 'UK 642',
            status: 'Airborne',
            org: 'Chicago',
            via: 'IST',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
        {
            flight: 'AI 812',
            status: 'Airborne',
            org: 'Delhi',
            via: 'ST | HYD | DEL',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
        {
            flight: '6E 1234',
            status: 'Landed',
            org: 'San Antonio',
            via: 'LA',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 5',
            gate: 'Gate C',
            belt: '9',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-110',
        },
    ];

    const dummyData2 = [
        {
            flight: 'UK 642',
            status: 'Airborne',
            org: 'Chicago',
            via: 'IST',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
        {
            flight: 'AI 812',
            status: 'Airborne',
            org: 'Delhi',
            via: 'ST | HYD | DEL',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },

        {
            flight: 'AI 812',
            status: 'Airborne',
            org: 'Delhi',
            via: 'ST | HYD | DEL',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
        {
            flight: 'AI 812',
            status: 'Airborne',
            org: 'Delhi',
            via: 'ST | HYD | DEL',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rny: 'Stand 1',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'Stand 1',
            gate: 'Gate A',
            belt: '7',
            acRegn: 'A1/S321',
            remarks: 'AS321',
            cs: 'DAC-910',
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Arrival',
            children: <><TableComponent
                columns={columns}
                data={dummyData}
                loading={loading}
                onChange={handleTableChange}
            /></>,
        },
        {
            key: '2',
            label: 'Departure',
            children: <><TableComponent
                columns={columns}
                data={dummyData2}
                loading={loading}
                onChange={handleTableChange}
            /></>,
        },
    ];
    const handleChange = () => {
        console.log('Tab switch');
    };

    return (
        <div className='body-container'>
            <div className='top-bar'>
                <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Schedule"} />
                <div className='filter-section'>
                    <Button
                        onClick={() => {
                            alert('Icon Button');
                        }}
                        icon={Filter}
                        alt="bell icon"
                        className={"filter-btn"}
                    />
                    <InputField
                        label="Airport Name"
                        name="search"
                        placeholder="Search"
                        warning="Required field"
                        type="search"
                    />

                </div>
            </div>
            <div className='flights-table'>
                <CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
            </div>
        </div>
    )
}

export default FlightSchedule;
