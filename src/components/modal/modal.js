import { Modal } from 'antd';
import React from 'react';
import './modal.scss';

const ModalComponent = ({ isModalOpen, children, width, closeModal, title, className, height }) => {
	return (
		<>
			{isModalOpen && (
				<Modal
					open={isModalOpen}
					closable={true}
					className={`modal ${className}`}
					width={width ? width : '80%'}
					height={height ?? 'auto'}
					centered
					footer={null}
					onCancel={closeModal}
					title={title}
				>
					{children}
				</Modal>
			)}
		</>
	);
};

export default React.memo(ModalComponent);
