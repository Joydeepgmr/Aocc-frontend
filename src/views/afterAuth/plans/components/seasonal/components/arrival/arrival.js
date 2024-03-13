import React,{useState} from 'react';
import './arrival.scss';
import TableComponent from '../../../../../../../components/table/table';
import { columns, dummyData } from './dummyData/dummy-data';


const Arrival = () => {
    const [loading, setLoading] = useState(false);
    
    const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};

    return (
        <div className="main">
            <div>
				<TableComponent columns={columns} data={dummyData} loading={loading} onChange={handleTableChange} />
			</div>
        </div>
    );
};

export default Arrival;
