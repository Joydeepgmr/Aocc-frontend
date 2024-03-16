import React, { useState } from 'react';
import Button from '../../../../../../../components/button/button';
import ModalComponent from '../../../../../../../components/modal/modal'; // Corrected import path
import FormComponent from '../../../formComponent/formComponent';
import UploadCsvModal from '../../../../../../../components/uploadCsvModal/uploadCsvModal';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import "./CDMSchedule.scss";
import TableComponent from '../../../../../../../components/table/table';

function CDMSchedule() {
    const items = [
        {
            key: "1",
            label: "Arrival",
            children: <ArrivalTab />,
        },
        {
            key: "2",
            label: "Departure",
            children: <DepartureTab />,
        }
    ]

    const handleChange = () => {
        console.log('Tab switch');
    };
    return (
        <div className='container-div'>
            <CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
        </div>
    )
}

const ArrivalTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCsvModalOpen(false);
    };

    const openCsvModal = () => {
        setIsCsvModalOpen(true);
    };

    const columns = [
        { title: 'FlightNo.', dataIndex: 'flightno', key: 'flightno' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Call Sign', dataIndex: 'callsign', key: 'callsign' },
        { title: 'Nature Code', dataIndex: 'naturecode', key: 'naturecode' },
        { title: 'ORG', dataIndex: 'org', key: 'org' },
        { title: 'STA', dataIndex: 'sta', key: 'sta' },
        { title: 'POS', dataIndex: 'pos', key: 'pos' },
        { title: 'REG No.', dataIndex: 'regno', key: 'regno' },
        { title: 'Flight Spilt (No.)', dataIndex: 'splitno', key: 'spiltno' },
        { title: 'Flight Recurrence', dataIndex: 'flightrecurrence', key: 'flightrecurrence' },
    ];

    const data = [
        {
            key: "1",
            flightno: "AI 812",
            date: "20/03/2024",
            callsign: "ABC 123",
            naturecode: "123",
            org: "Lucknow",
            sta: "15:00",
            pos: "21,39.9",
            regno: "SS213",
            splitno: "AB123",
            flightrecurrence: "MTW",
        },
        {
            key: "2",
            flightno: "6E 6172",
            date: "15/03/2024",
            callsign: "ID 1234",
            naturecode: "123",
            org: "Surat",
            sta: "15:30",
            pos: "21,39.9",
            regno: "SS213",
            splitno: "6E 123",
            flightrecurrence: "Once",
        },
        {
            key: "3",
            flightno: "UK 642",
            date: "26/03/2024",
            callsign: "ID 1234",
            naturecode: "123",
            org: "Chicago",
            sta: "14:00",
            pos: "21,39.9",
            regno: "SS213",
            splitno: "AI 1234",
            flightrecurrence: "WFS",
        },
        {
            key: "4",
            flightno: "AI 916",
            date: "30/03/2024",
            callsign: "ID 1234",
            naturecode: "123",
            org: "Chicago",
            sta: "14:30",
            pos: "21,39.9",
            regno: "SS213",
            splitno: "6E213",
            flightrecurrence: "Once",
        },
        {
            key: "5",
            flightno: "6E 1234",
            date: "10/04/2024",
            callsign: "ID 1234",
            naturecode: "123",
            org: "Hyderbad",
            sta: "16:00",
            pos: "21,39.9",
            regno: "SS213",
            splitno: "6E213",
            flightrecurrence: "WFS",
        }

    ]

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter);
    };

    return (
        <div className='Arrival-container'>
            <TopHeader
                heading="Collaborative Decision Making Schedule"
            />
            <div className='table-container'>
                <TableComponent columns={columns} data={data} onChange={handleTableChange} />
            </div>
        </div>
    )
}

const DepartureTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCsvModalOpen(false);
    };

    const openCsvModal = () => {
        setIsCsvModalOpen(true);
    };

    return (
        <div className='Arrival-container'>
            <TopHeader
                heading="Collaborative Decision Making Schedule"
            />
            <div className="container">
                <Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
                <Button title="Upload CSV" id="btn" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
                <Button title="Download CSV Template" id="btn" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
                <ModalComponent isModalOpen={isModalOpen} width="120rem" closeModal={closeModal} title="Collaborative Decision Making Schedule" className="custom_modal">
                    <div className="modal_content"><FormComponent handleButtonClose={closeModal} handleSaveButton={closeModal} /></div>
                </ModalComponent>
                <UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeModal} />
            </div>
        </div>
    )
}

export default CDMSchedule;
