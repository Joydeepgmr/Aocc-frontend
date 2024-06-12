import React from 'react';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import TableComponent from '../../../../../components/table/table';
import ButtonComponent from '../../../../../components/button/button';

import './common_table.scss';

const Common_table = ({
	data,
	columns,
	loading,
	fetchData,
	pagination,
	title,
	openModal,
	openCSVModal,
	type,
	downloadCSV,
	title1 = 'Create',
	writeAccess,
}) => {
	const handleDropdownChange = (value) => {
		// Add this line
		if (value === title1) {
			!!openModal && openModal();
		}

		if (value === 'UploadCSV') {
			!!openCSVModal && openCSVModal();
		}
		if (value === 'downloadCSVTemplate') {
			!!downloadCSV && downloadCSV();
		}
	};
	const items =
		type === 'aircraft'
			? [
				{
					key: '1',
					label: title1,
					value: title1,
					children: '',
				},
			]
			: [
				{
					key: '1',
					label: title1,
					value: title1,
					children: '',
				},
				{
					key: '2',
					label: 'Upload CSV',
					value: 'UploadCSV',
					children: '',
				},
				{
					key: '3',
					label: 'Download CSV Template',
					value: 'downloadCSVTemplate',
				},
			];
	return (
		<div className="airport_master_details">
			<div className="custom_dropdown_style">
				{writeAccess &&
					<DropdownButton
						buttonText={'Create'}
						className="custom_dropdown"
						dropdownItems={items}
						onChange={handleDropdownChange}
					/>
				}
			</div>

			<div className="custom_table">
				<TableComponent
					columns={columns}
					data={data}
					loading={loading}
					fetchData={fetchData}
					pagination={pagination}
				/>
			</div>
		</div>
	);
};

export default Common_table;
