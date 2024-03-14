import React from 'react';
import './airportSetupTable.scss';
import { useSelector } from 'react-redux';
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';

const AirportSetupTable = () => {
	const { additionalAirportData } = useSelector((store) => store.globalMasters);

	console.log('additionalAirportData', additionalAirportData);
	const rows = additionalAirportData?.map((data) => {
		return {
			airportName: data.airportName ?? 'NA',
			iataCode: data.iataCode ?? 'NA',
			atcCode: data.atcCode ?? 'NA',
			abbreviatedName1: data.abbreviatedName1 ?? 'NA',
			abbreviatedName2: data.abbreviatedName2 ?? 'NA',
			abbreviatedName3: data.abbreviatedName3 ?? 'NA',
			abbreviatedName4: data.abbreviatedName4 ?? 'NA',
			countryCode: data.countryCode ?? 'NA',
			standardFlightTime: data.standardFlightTime ?? 'NA',
			timeChange: data.timeChange ?? 'NA',
			timeDifferenceAfter: data.timeDifferenceAfter ?? 'NA',
			timeDifferenceBefore: data.timeDifferenceBefore ?? 'NA',
			timeDifferenceSummer: data.timeDifferenceSummer ?? 'NA',
			timeDifferenceWinter: data.timeDifferenceWinter ?? 'NA',
			validFrom: data.validFrom ?? 'NA',
			validTo: data.validTo ?? 'NA',
		};
	});

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (
				text,
				record
			) => (
				<div className="action_buttons">
					<ButtonComponent
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
					<ButtonComponent
						onClick={() => handleDelete(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'Name',
			dataIndex: 'airportName',
			key: 'airportName',
		},
		{
			title: 'Airport Code',
			dataIndex: 'iataCode',
			key: 'atcCode',
		},
		{
			title: 'Airport Type',
			dataIndex: 'airportType',
			key: 'airportType',
		},
		{
			title: 'Country Code',
			dataIndex: 'countryCode',
			key: 'countryCode',
		},
		{
			title: 'Standard Flight Time',
			dataIndex: 'standardFlightTime',
			key: 'standardFlightTime',
		},
		{
			title: 'Time Change',
			dataIndex: 'timeChange',
			key: 'timeChange',
		},
		{
			title: 'View Details',
			key: 'viewDetails',
			render: (
				text,
				record // Use the render function to customize the content of the cell
			) => <ButtonComponent title="View Details" type="text"></ButtonComponent>,
		},
	];
	return (
		<div>
			<div className="create_wrapper_table">
				<div className="table_container">
					<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
						Airports
					</CustomTypography>
					<TableComponent data={rows} columns={columns} />
				</div>
			</div>
		</div>
	);
};

export default AirportSetupTable;
