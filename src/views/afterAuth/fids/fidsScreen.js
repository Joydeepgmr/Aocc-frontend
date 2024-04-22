import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './fidsScreen.scss';

const FidsScreen = () => {
    const data2 = {
        std: '16:00',
        etd: '19:30',
        toVia: 'Visakhapatnam',
        airline: 'IndiGo',
        flight: '6E123',
        status: 'On Time',
        gate: 'A3'
    }
    const data1 = {
        std: '12:00',
        etd: '12:30',
        toVia: 'Mumbai',
        airline: 'Air India',
        flight: 'AI123',
        status: 'On Time',
        gate: 'A6'
    }
    const [data, setData] = useState([...Array(10).fill(data1).map((data, index) => data), ...Array(30).fill(data2).map((data, index) => data)]);
    const [dataToShow, setDataToShow] = useState([]);
    const [pagination, setPagination] = useState({});
    const [fonts, setFonts] = useState({ columnFont: '', dataFont: '', dataHeight: '' });
    const [isRotating, setIsRotating] = useState(false);
    const tableRef = useRef(null);

    const handleRotateClickForOne = (index) => {
        if (!isRotating) {
            setIsRotating(true);
            const rows = document.querySelectorAll('.fids-table-body tr');
            setTimeout(() => {
                rows[index].classList.add('rotate');
                setTimeout(() => {
                    // let updatedData = data;
                    // updatedData[index] = data[index].std == '16:00' ? data1 : data2;
                    // setData([...updatedData]);
                    rows[index].classList.remove('rotate');
                    setIsRotating(false);
                }, 900)
            }, (index + 1) * 100);
        }
    };
    const handlePagination = () => {
        let min, max, page;
        if (pagination.page >= pagination.total) {
            page = 1;
            min = 0;
            max = pagination?.dataPerPage
        } else {
            page = pagination.page + 1;
            min = pagination?.max;
            max = pagination?.max + pagination?.dataPerPage
        }
        setPagination({ ...pagination, min, max, page });
    }
    const handleRotateClick = () => {
        if (!isRotating) {
            setIsRotating(true);
            const rows = document.querySelectorAll('.fids-table-body tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.classList.add('rotate');
                    setTimeout(() => {
                        const { dataPerPage, min, max } = pagination;
                        if (max < data?.length) {
                            let updatedData = dataToShow;
                            updatedData[index] = data[dataPerPage + min + index];
                            setDataToShow([...updatedData]);
                        } else {
                            let updatedData = dataToShow;
                            updatedData[index] = data[index];
                            setDataToShow([...updatedData]);
                        }
                        row.classList.remove('rotate');
                        if (index === rows.length - 1) {
                            handlePagination();
                            setIsRotating(false);
                        }
                    }, 500)
                }, (index + 1) * 300);
            });
        }
    };
    useEffect(() => {
        const percentage = (part, total) => (part * total) / 100;
        const calculateNumVisibleRows = () => {
            if (tableRef.current) {
                const tbodyHeight = tableRef.current.clientHeight;
                const tbodyWidth = tableRef.current.clientWidth;
                let columnFont, dataFont, dataHeight, dataPerPage, dateTimeFont, letterSpace;
                if (tbodyWidth * 1.5 < tbodyHeight) {
                    console.log("under else ", tbodyWidth, tbodyHeight);
                    columnFont = `${Math.round(percentage(3.7, tbodyWidth))}px`;
                    dataFont = `${Math.round(percentage(3.6, tbodyWidth))}px`;
                    letterSpace = `${Math.round(percentage(0.5, tbodyWidth))}px`;
                    dateTimeFont = `${Math.round(percentage(2.8, tbodyWidth))}px`;
                    dataHeight = `${Math.round(percentage(16, tbodyWidth))}px`;
                    dataPerPage =
                        Math.floor(
                            100 / ((percentage(16, tbodyWidth) * 100) / tbodyHeight)
                        ) - 1;
                } else {
                    console.log("under else ", tbodyWidth, tbodyHeight)
                    columnFont = `${Math.round(percentage(2.1, tbodyWidth))}px`
                    dataFont = `${Math.round(percentage(2, tbodyWidth))}px`
                    letterSpace = `${Math.round(percentage(0.25, tbodyWidth))}px`
                    dateTimeFont = `${Math.round(percentage(1.6, tbodyWidth))}px`
                    dataHeight = `${Math.round(percentage(5, tbodyWidth))}px`
                    dataPerPage = Math.floor(100 / ((percentage(5, tbodyWidth) * 100) / tbodyHeight)) - 1;
                }
                setPagination({ min: 0, max: dataPerPage, page: 1, total: Math.ceil(data?.length / dataPerPage), dataPerPage })
                setDataToShow([...data.slice(0, dataPerPage)]);
                setTimeout(() => {
                    console.log(columnFont, dataFont, dataHeight, tbodyHeight, tbodyWidth, dataPerPage, dataHeight, Math.ceil(data?.length / dataPerPage), "___________________")
                }, 0)

                setFonts({ columnFont, dataFont, dataHeight, dateTimeFont, letterSpace })
            }
        };
        console.log("this re renders")
        calculateNumVisibleRows();
    }, []);
    useEffect(() => {
        let intervalId;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            handleRotateClick();
        }, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [dataToShow]);
    return (
        <>
            <div className='fids-container'>
                <div className="table-container" ref={tableRef}>
                    <table border="0" className={`fids-table ${isRotating ? 'rotate-animation' : ''}`} style={{ letterSpacing: fonts?.letterSpace }}>
                        <thead className='fids-table-header' style={{ fontSize: fonts?.columnFont, height: fonts?.dataHeight }}>
                            <tr>
                                <th className='align-left'>Airline</th>
                                <th className='align-left'>Flight</th>
                                <th className='align-left'>TO/VIA</th>
                                <th>STD</th>
                                <th>ETD</th>
                                <th>Status</th>
                                {/* <th>Gate</th> */}
                            </tr>
                        </thead>
                        <tbody className='fids-table-body'>
                            {dataToShow.map((item, index) => (
                                <tr className={`${(index == dataToShow?.length - 1 || !item) && 'noBorder'}`} key={index} style={{ fontSize: fonts?.dataFont, height: fonts?.dataHeight }}>
                                    <td style={{ padding: fonts?.letterSpace }} className='align-left'>{item?.airline}</td>
                                    <td style={{ padding: fonts?.letterSpace }} className='align-left'>{item?.flight}</td>
                                    <td style={{ padding: fonts?.letterSpace }} className='align-left'>{item?.toVia}</td>
                                    <td style={{ padding: fonts?.letterSpace }}>{item?.std}</td>
                                    <td style={{ padding: fonts?.letterSpace }}>{item?.etd}</td>
                                    <td style={{ padding: fonts?.letterSpace }}>{item?.status}</td>
                                    {/* <td>{item?.gate}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='fids-table-footer'
                    style={{ fontSize: fonts?.columnFont }}
                >
                    <div className="footer-logo">
                        <p>GMR</p>
                    </div>
                    <div className="footer-logo">
                        <p className='time-footer' style={{ fontSize: fonts?.dateTimeFont }}>
                            <span className="time">12:45 PM</span>
                            <span className='page'>Page {pagination?.page}/{pagination?.total}</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* <button onClick={handleRotateClick}>Toggle Data</button>
            <button onClick={() => handleRotateClickForOne(4)}>Toggle Data</button> */}
        </>
    );
};

export default FidsScreen;