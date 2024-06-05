import React, { useEffect, useState } from 'react'
import './beltPreview.scss'
const BeltFids = ({ flightNo, origin, airlineLogo, counter }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const beltData = {
            airline: airlineLogo,
            origin,
            flightNo
        }
        setData([beltData])
    }, [flightNo, origin, airlineLogo]);
    console.log("data is ", data)
    const formatTime = () => {
        const currentTime = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const dayOfWeek = days[currentTime.getDay()];
        const dayOfMonth = currentTime.getDate().toString().padStart(2, '0');
        const month = months[currentTime.getMonth()];
        const year = currentTime.getFullYear();

        const hours = currentTime.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
        const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes

        return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} - ${hours}:${minutes}`;
    };
    return (
        <div className='card'>
            <div className='header'>
                <span className='counter_name'>
                    BELT NO {counter}
                </span>
            </div>
            <div className="belt-table">
                <table border="0">
                    <thead className='fids-table-header'>
                        <tr>
                            <th style={{ width: '16rem' }}>AIRLINE</th>
                            <th className='align-left'>FLIGHT NO</th>
                            <th className='align-left'>ORIGIN</th>
                        </tr>
                    </thead>
                    <tbody className='fids-table-body'>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='align-left'>
                                    <div className='airline_column'>
                                        <img src={item.airline} alt='airline' />
                                    </div>
                                </td>
                                <td className='align-left'>{item.flightNo}</td>
                                <td className='align-left'>{item.origin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BeltFids;