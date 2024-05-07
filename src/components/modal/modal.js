import { Modal } from 'antd';
import React from 'react';
import './modal.scss';

const ModalComponent = ({ isModalOpen, children, width = '80%', closeModal, title, className, height = 'auto' }) => {
	return (
		<>
			{isModalOpen && (
				<>
					<div className="custom-modal-overlay">
						<div className="backdrop" onClick={closeModal}></div>
						<div className={`custom-modal ${className}`} style={{ width, height }}>
							{title && (
								<div className="custom-modal-header">
									<h2>{title}</h2>
									<button className="close-button" onClick={closeModal}>
										X
									</button>
								</div>
							)}
							<div className="custom-modal-content">{children}</div>
						</div>
					</div>
				</>
			)}
			{/* {isModalOpen && (
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
			)} */}
		</>
	);
};

export default React.memo(ModalComponent);
