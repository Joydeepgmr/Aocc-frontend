import React, { useState } from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
const Airlines = () => {
	return (
		<>
			<Common_Card
				title1="Create"
				title2={'Import Global Reference'}
				btnCondition={false}
				Heading={'Setup aircraft registration'}
				// formComponent={<FormComponent closeModal={closeModal} />}
			/>
		</>
	);
};

export default React.memo(Airlines);
