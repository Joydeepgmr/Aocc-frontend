import { Modal } from 'antd';
import React from 'react';

const ModalComponent = ({ isModalOpen, children, width, closeModal, title }) => {
	return (
		<>
			<Modal
				open={isModalOpen}
				closable={true}
				className="modal"
				width={width ? width : '32rem'}
				centered
				footer={null}
				onCancel={closeModal}
				title={title}
			>
				{children}
			</Modal>
		</>
	);
};

export default React.memo(ModalComponent);
