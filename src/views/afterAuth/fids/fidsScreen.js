import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './fidsScreen.scss';

const FidsScreen = () => {
    const [data, setData] = useState(Array(20).fill({
        std: '12:00',
        etd: '12:30',
        toVia: 'Delhi',
        airline: 'IndiGo',
        flight: '6E123',
        status: 'On Time',
        gate: 'A3'
    }));
    const [fonts, setFonts] = useState({ columnFont: '', dataFont: '' });
    const [isRotating, setIsRotating] = useState(false);
    const tableRef = useRef(null);

    const handleRotateClickForOne = (index) => {
        if (!isRotating) {
            setIsRotating(true);
            const rows = document.querySelectorAll('.fids-table-body tr');
            setTimeout(() => {
                rows[index].classList.add('rotate');
                setTimeout(() => {
                    rows[index].classList.remove('rotate');
                    setIsRotating(false);
                }, 500)
            }, (index + 1) * 100);
        }
    };
    const handleRotateClick = () => {
        if (!isRotating) {
            setIsRotating(true);
            const rows = document.querySelectorAll('.fids-table-body tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.classList.add('rotate');
                    setTimeout(() => {
                        row.classList.remove('rotate');
                    }, 500)
                    if (index === rows.length - 1) {
                        setIsRotating(false); // Reset isRotating after the last row is animated
                    }
                }, (index + 1) * 100);
            });
        }
    };

    useEffect(() => {
        const percentage = (part, total) => (part * total) / 100;
        const calculateNumVisibleRows = () => {
            if (tableRef.current) {
                const tbodyHeight = tableRef.current.clientHeight;
                console.log(tbodyHeight, "___________________ t body height")
                const columnFont = `${Math.round(percentage(5, tbodyHeight))}px`
                const dataFont = `${Math.round(percentage(4, tbodyHeight))}px`
                setTimeout(() => {
                    console.log(columnFont, dataFont, tbodyHeight, "___________________")
                }, 0)

                setFonts({ columnFont, dataFont })
                console.log("table height is ", tbodyHeight)
                // const rowHeight = 60; // Adjust this value based on your row height
                // const newNumVisibleRows = Math.floor(tbodyHeight / rowHeight);
            }
        };
        calculateNumVisibleRows();
        // window.addEventListener('resize', calculateNumVisibleRows);
        // return () => {
        //     window.removeEventListener('resize', calculateNumVisibleRows);
        // };
    }, []);
    return (
        <>
            <div className="table-container">
                <table border="0" className={`fids-table ${isRotating ? 'rotate-animation' : ''}`}>
                    <thead className='fids-table-header' style={{ fontSize: fonts?.columnFont }}>
                        <tr>
                            <th>STD</th>
                            <th>ETD</th>
                            <th>TO/VIA</th>
                            <th>Airline</th>
                            <th>Flight</th>
                            <th>Status</th>
                            <th>Gate</th>
                        </tr>
                    </thead>
                    <tbody className='fids-table-body' ref={tableRef}>
                        {data.map((item, index) => (
                            <tr key={index} style={{ fontSize: fonts?.dataFont }}>
                                <td>{item.std} {index}</td>
                                <td>{item.etd}</td>
                                <td>{item.toVia}</td>
                                <td>{item.airline}</td>
                                <td>{item.flight}</td>
                                <td>{item.status}</td>
                                <td>{item.gate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='fids-table-footer'>
                    <div className="footer-logo">
                        <p>GMR</p>
                    </div>
                    <div className="footer-logo">
                        <p className='time-footer'>
                            <span className="time">12:45 PM</span>
                            <span className='page'>Page 1/12</span>
                        </p>
                    </div>
                </div>
            </div>
            <button onClick={handleRotateClick}>Toggle Data</button>
            <button onClick={() => handleRotateClickForOne(4)}>Toggle Data</button>
        </>
    );
};

export default FidsScreen;