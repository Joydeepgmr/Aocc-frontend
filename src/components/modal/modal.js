import React from 'react';
import CustomTypography from '../typographyComponent/typographyComponent';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './modal.scss';

const ModalComponent = ({ isModalOpen, children, width = '80%', closeModal, title, className, height = 'auto', onEdit, onDelete, record }) => {
	return (
		<>
			{isModalOpen && (
				<>
					<div className="custom-modal-overlay">
						<div className="backdrop" onClick={closeModal}></div>
						<div className={`custom-modal ${className}`} style={{ width, height }}>
							<div className="custom-modal-header">
								{title && (
									<CustomTypography className='modal_title'>{title}</CustomTypography>
								)}
								<div className='title-button'>
									{onEdit && record ?
										<button className='close-button'>
											<EditOutlined onClick={() => onEdit(record, true)} />
										</button> : null
									}
									{onDelete && record ?
										<button className='close-button' onClick={closeModal}>
											<DeleteOutlined onClick={() => onDelete(record)} />
										</button> : null
									}
									<button className='close-button' onClick={closeModal}>
										X
									</button>
								</div>
							</div>
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
