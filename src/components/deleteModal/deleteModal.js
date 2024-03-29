import { Modal } from 'antd';
import React from 'react';

const deleteModal = ({width, onSave, onClose, title, className, content }) => {
	return (
		<>
			<Modal
				// open={isModalOpen}
				// closable={true}
				className={`deleteModal ${className}`}
				width={width ? width : '32rem'}
				// centered
				// footer={null}
				// onCancel={closeModal}
				title={title}
			>
				content
			</Modal>
		</>
	);
};

export default React.memo(deleteModal);