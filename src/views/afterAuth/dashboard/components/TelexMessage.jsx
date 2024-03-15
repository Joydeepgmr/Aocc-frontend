import React, {useState} from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent'
import CustomTabs from '../../../../components/customTabs/customTabs'
import TableComponent from '../../../../components/table/table'
import InputField from '../../../../components/inputField/inputField'
import Button from '../../../../components/button/button'
import Filter from '../../../../assets/Filter.svg'
import './style.scss';

function TelexMessage() {
    const [loading, setLoading] = useState(false);
    const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};

    const columns = [
        {
            title: 'Flight',
            dataIndex: 'flight',
            key: 'flight',
        },
        {
            title: 'Flight Type',
            dataIndex: 'flightType',
            key: 'flightType',
        },
        {
            title: 'Call sign',
            dataIndex: 'callSign',
            key: 'callSign',
        },
        {
            title: 'Updates',
            children: [
                {
                    title: 'Message origin',
                    dataIndex: 'messageOrigin',
                    key: 'messageOrigin',
                },
                {
                    title: 'Telex Message',
                    dataIndex: 'telexMessage',
                    key: 'telexMessage',
                },
                {
                    title: 'Milestones achieved',
                    dataIndex: 'milestonesAchieved',
                    key: 'milestonesAchieved',
                    render: (text, record) => (
                        <a href={`/details/${record.key}`}>View Details</a>
                    ),
                },
            ],
        },
    ];

    const data = [
        {
            key: '1',
            flight: 'AI 812',
            flightType: 'Type A',
            callSign: 'Sign A',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 1',
        },
        {
            key: '2',
            flight: '6E 6172',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 2',
        },
        {
            key: '3',
            flight: 'AI 812',
            flightType: 'Type A',
            callSign: 'Sign A',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 1',
        },
        {
            key: '4',
            flight: 'AI 916',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 2',
        },
        {
            key: '5',
            flight: 'UK 642',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 2',
        },
    ];

    const data2 = [
        {
            key: '1',
            flight: 'AI 812',
            flightType: 'Type A',
            callSign: 'Sign A',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1900EX SD2000',
            milestonesAchieved: 'Milestone 1',
        },
        {
            key: '2',
            flight: 'AI 812',
            flightType: 'Type A',
            callSign: 'Sign A',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 18991S SD890',
            milestonesAchieved: 'Milestone 1',
        },
        {
            key: '3',
            flight: 'AI 916',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559SAD SX245',
            milestonesAchieved: 'Milestone 2',
        },
        {
            key: '4',
            flight: 'UK 642',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 2',
        },
        {
            key: '5',
            flight: '6E 6172',
            flightType: 'Type B',
            callSign: 'Sign B',
            messageOrigin: 'IST ATC',
            telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
            milestonesAchieved: 'Milestone 2',
        },
    ];

    const items = [
		{
			key: '1',
			label: 'Arrival',
			children: <><TableComponent
			columns={columns}
			data={data}
			loading={loading}
			onChange={handleTableChange}
		/></>,
		},
		{
			key: '2',
			label: 'Departure',
			children: <><TableComponent
			columns={columns}
			data={data2}
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
    <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Schedule"}/>
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

export default TelexMessage
