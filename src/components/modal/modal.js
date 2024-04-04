import { Modal } from 'antd';
import React from 'react';
import "./modal.scss"

const ModalComponent = ({ isModalOpen, children, width, closeModal, title, className }) => {
	return (
	
			<Modal
				open={isModalOpen}
				closable={true}
				className={`modal ${className}`}
				width={width ? width : '80%'}
				height={"80%"}
				centered
				footer={null}
				onCancel={closeModal}
				title={title}
			>
				{children}
			</Modal>
		
	);
};

export default React.memo(ModalComponent);