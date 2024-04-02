import React from 'react';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
const ParkingStand = () => {



	
	return (
		<>
			{!Boolean(fetchParkingStand?.length) ? (
				<Common_Card
                title1="Create"
                title2={'Import Global Reference'}
                title3={'Download CSV Template'}
                btnCondition={true}
                Heading={'Add Parking Stands'}
                formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} />}
            />
			) : (
				<>
					<div className="parking-stand">
						<div className="parking-stand--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Actions"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="parking-stand--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Parking Stand
							</CustomTypography>
							<TableComponent data={fetchParkingStand.map(item => ({ ...item, terminal: item.terminal?.name }))} columns={columns} />
						</div>
					</div>

					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add parking-stand Counters'}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
							/>
						</div>
					</ModalComponent>
					
				<ModalComponent
				isModalOpen={isEditModalOpen}
				width="120rem"
				closeModal={closeEditModal}
				title={`Edit parking-stand Counters`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						isEdit = {true}
						initialValues={rowData}
						isReadOnly = {isReadOnly}
					/>
				</div>
			</ModalComponent>
				</>
			)}
		</>
	);
};

export default ParkingStand;
