import React from 'react';
import { Form } from 'antd';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import InputField from '../../../components/inputField/inputField';


const Form = () => {

    return (
        <div className="form_heading">
            <Form>
                <CustomTypography type="title" fontSize={16} fontWeight="600" color="black">Flight Number</CustomTypography>
                <InputField
                    label="Airport Name"
                    name="airportName"
                    placeholder="Write Airport Name"
                    required
                    warning="Required field"
                />
            </Form>
        </div>
    );
};

export default Form;