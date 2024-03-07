import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modalComponent/modalComponent';
import FormComponent from '../formComponent/formComponent';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import Filter from '../../../../../assets/Filter.svg';
import InputField from '../../../../../components/inputField/inputField';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import Arrival from './components/arrival/arrival';
import Departure from './components/departure/departure';
import './seasonal.scss';


export const columns = [
    { title: 'Flight No.', dataIndex: 'flightNo', key: 'flightNo' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Call Sign', dataIndex: 'callSign', key: 'callSign' },
    { title: 'Nature Code', dataIndex: 'natureCode', key: 'natureCode' },
    { title: 'ORG', dataIndex: 'org', key: 'org' },
    { title: 'VIA', dataIndex: 'via', key: 'via' },
    { title: 'ATD', dataIndex: 'atd', key: 'atd' },
    { title: 'STA', dataIndex: 'sta', key: 'sta' },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    { title: 'TMO', dataIndex: 'tmo', key: 'tmo' },
    { title: 'ATA', dataIndex: 'ata', key: 'ata' },
    { title: 'Stand Code', dataIndex: 'standCode', key: 'standCode' },
    { title: 'AC Type', dataIndex: 'ACType', key: 'ACType' },
    { title: 'REG No.', dataIndex: 'REGNo', key: 'REGNo' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
];

export const dummyData = [
    { key: '1', flightNo: 'AI 812', date: 20240227, callSign: 'ABC 123', natureCode: '123', org: 'Lucknow', via: 'ST | HYD | DEL', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213', action: {} },
    { key: '2', flightNo: '6E 6172', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Surat', via: '-', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '3', flightNo: 'UK 642', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Chicago', via: '-', atd: '15:00', sta: '15:00', eta: '15:30', tmo: '15:30', ata: '15:30', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '4', flightNo: 'AI 916', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Chicago', via: 'IST', atd: '15:00', sta: '15:00', eta: '16:00', tmo: '16:00', ata: '16:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '5', flightNo: '6E 1234', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Lucknow', via: 'HYD', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '6', flightNo: '6E 1234', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Hyderabad', via: '-', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '7', flightNo: '6E 1234', date: 20240227, callSign: 'ID 1234', natureCode: '123', org: 'Chandigarh', via: '-', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
];

export const dropdownItems = [
    {
        label: 'Create',
        value: 'create',
        key: '0',
    },
    {
        label: 'Upload CSV',
        value: 'uploadCSV',
        key: '1',
    },
    {
        label: 'Download CSV Template',
        value: 'downloadCSVTemplate',
        key: '2',
    },
];

export const tabItems = [
    {
        key: '1',
        label: 'Arrival',
        children: <Arrival />

    },
    {
        key: '2',
        label: 'Departure',
        children: <Departure />,

    },
];

const showTable = dummyData.length > 0;


const Seasonal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const openCsvModal = () => {
        setIsCsvModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCsvModalOpen(false);
    };

    const [index, setIndex] = useState(0);

    const handleChange = (key) => {
        setIndex(key);
    };

    const handleDropdownItemClick = (value) => {
        if (value === 'create') {
            openModal();
        } else if (value === 'uploadCsv') {
            openCsvModal();
        }
    };

    return (
        <>
            {!showTable ? (
                <div className="main_buttonContainer">
                    <div className="seasonal_container">
                        <Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
                        <ModalComponent isModalOpen={isModalOpen} width="120rem" closeModal={closeModal} title="Seasonal Planning" className="custom_modal">
                            <div className="modal_content"><FormComponent /></div>
                        </ModalComponent>

                        <Button id="btn" title="Upload CSV" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
                        <UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeModal} />
                        <Button id="btn" title="Download CSV Template" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
                    </div>
                </div>
            ) : (
                <div className="main_TableContainer">
                    <div className='top_container'>
                        <div>
                            <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">Flight Schedule Planning</CustomTypography>
                        </div>
                        <div className='icon_container'>
                            <Button onClick={() => {
                                alert('Filter Icon');
                            }}
                                type="iconWithBorder"
                                className={'custom_filter'}
                                icon={Filter}
                                alt="arrow icon"
                            />
                            <InputField
                                label="search"
                                name="search"
                                placeholder="Search"
                                className='custom_inputField'
                                warning="Required field"
                                type="search"
                            />
                        </div>
                    </div>
                    <div className='table_container'>
                        <div>
                            <CustomTabs defaultActiveKey="1" items={tabItems} onChange={handleChange} type="simple" />
                        </div>
                        <div className='button_container'>
                            <DropdownButton
                                dropdownItems={dropdownItems}
                                buttonText="Actions"
                                className="custom_dropdownButton"
                                onChange={handleDropdownItemClick}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>



    );
};

export default Seasonal;
