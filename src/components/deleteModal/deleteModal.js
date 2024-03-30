import { Modal } from 'antd';
import React from 'react';

const DeleteModal = ({ isModalOpen, content, width, closeModal, title, className }) => {
	return (
		<>
			<Modal
				open={isModalOpen}
				closable={true}
				className={`delteodal ${className}`}
				width={width ? width : '32rem'}
				centered
				footer={null}
				onCancel={closeModal}
				title={title}
			>
				{content}
			</Modal>
		</>
	);
};

export default React.memo(DeleteModal);