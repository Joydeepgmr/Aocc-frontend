import React,{useState} from 'react';
import { Form } from 'antd';
import InputField from '../../../components/inputField/inputField';
import './formComponent.scss';
import Button from '../../../components/button/button';

const FormComponent = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div className="main_form">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className='form_section ' >
                    <div className='form_content'>
                        <InputField
                            label="Flight Number"
                            name="flightNumber"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="Date"
                            name="date"
                            placeholder="Pick a date"
                            required
                            warning="Required field"
                        />

                        <InputField
                            label="Flight Id"
                            name="flightId"
                            placeholder="Filled Text"
                            required
                            warning="Required field"
                        />
                    </div>

                    <div className='form_content'>
                        <InputField
                            label="Nature Code"
                            name="natureCode"
                            placeholder="AI1234"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="Origin"
                            name="origin"
                            placeholder="Filled Text"
                            required
                            warning="Required field"
                            type="number"
                        />

                        <InputField
                            label="Via"
                            name="via"
                            placeholder="Filled Text"
                            required
                            warning="Required field"
                        />
                    </div>

                    <div className='form_content'>
                        <InputField
                            label="ATD"
                            name="atd"
                            placeholder="B2345"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="STA"
                            name="sta"
                            placeholder="Filled Text"
                            required
                            warning="Required field"
                        />

                        <InputField
                            label="TMO"
                            name="tmo"
                            placeholder="Filled Text"
                            required
                            warning="Required field"
                        />
                    </div>

                    <div className='form_content'>
                        <InputField
                            label="ATA"
                            name="ata"
                            placeholder="Password"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="POS"
                            name="pos"
                            placeholder="Write Input Number"
                            required
                            warning="Required field"
                        />

                        <InputField
                            label="A/C Type"
                            name="acType"
                            placeholder="Time Difference Summer"
                            required
                            warning="Required field"
                        />
                    </div>
                </div>

                <div className='form_section'>
                    <div className='form_content'>
                        <InputField
                            label="Absolute Period"
                            name="absolutePeriod"
                            placeholder="from"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label=""
                            name=""
                            placeholder="to"
                            // required
                            warning="Required field"
                        />

                        <InputField
                            label="Days"
                            name="days"
                            placeholder="Enter the total no. of days"
                            required
                            warning="Required field"
                        />
                    </div>

                    <div className='form_content'>
                        <InputField
                            label="Relative Period"
                            name="relativePeriod"
                            placeholder="from"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label=""
                            name=""
                            placeholder="to"
                            // required
                            warning="Required field"
                            type="number"
                        />
                    </div>
                </div>

                <div className='form_section'>
                    <div className='form_content'>
                        <InputField
                            label="Aircraft Position"
                            name="aircraftPosition"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="Belt"
                            name="belt"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                        />

                        <InputField
                            label="Gate"
                            name="gate"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                        />
                    </div>

                    <div className='form_content'>
                        <InputField
                            label="Lounge"
                            name="lounge"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                        />
                        <InputField
                            label="Check In Counter"
                            name="checkInCounter"
                            placeholder="Enter the airport name"
                            required
                            warning="Required field"
                            type="number"
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default FormComponent;