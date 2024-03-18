import React from 'react';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './naturecode.scss';
const NatureCode = () => {
	return (
		<>
			<Common_Card
				title1="Create"
				title2={'Import Global Reference'}
				title3={'Download CSV Template'}
				btnCondition={true}
				Heading={'Nature Code'}
				formClassName="form_nature_code"
				formComponent={<FormComponent />}
			/>
		</>
	);
};

export default NatureCode;
