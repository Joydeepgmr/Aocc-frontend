import React from 'react';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
const Terminal = () => {
	return (
		<>
			<Common_Card
				title1="Create"
				title2={'Import Global Reference'}
				title3={'Download CSV Template'}
				btnCondition={true}
				Heading={'Setup aircraft registration'}
				formComponent={<FormComponent/>}
			/>
		</>
	);
};

export default Terminal;
