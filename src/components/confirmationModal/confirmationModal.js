import './confirmationModal.scss';
import { Modal } from 'antd';
import React from 'react';
import ButtonComponent from '../button/button';

const confirmationModal = ({
	isOpen = true,
	title = 'Are You Sure?',
	content = 'you want to delete this',
	buttonTitle1 = 'Cancel',
	buttonTitle2 = 'Delete',
	width = '35rem',
	onSave,
	onClose,
	className,
	isLoading,
}) => {
	return (
		<>
			<Modal
				open={isOpen}
				closable={true}
				className={`confirmationModal ${className}`}
				width={width ? width : '30rem'}
				centered
				onCancel={onClose}
				footer={null}
			>
				<div className="confirmation_modal_container">
					<h3 className="confirmation_modal_title">{title}</h3>
					<p className="confirmation_modal_content">{content}</p>

					<div className="confirmation_modal_footer">
						<ButtonComponent
							title={buttonTitle1}
							type="filledText"
							className="button_cancel"
							onClick={onClose}
							disabled={isLoading}
						/>
						<ButtonComponent
							title={buttonTitle2}
							type="filledText"
							className="button_save"
							onClick={onSave}
							disabled={isLoading}
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default React.memo(confirmationModal);
