import React from 'react';
import './fullScreenModal.scss';

const FullScreenModal = ({ isModalOpen, children, width = '60rem', height = 'auto', closeModal, title, className }) => {
    const handleClose = () => {
        closeModal();
    };

    return (
        <>
            {isModalOpen && (
                <div className="custom-modal-overlay" onClick={handleClose}>
                    <div className={`custom-modal ${className}`} style={{ width, height }}>
                        {title &&
                            <div className="custom-modal-header">
                                <h2>{title}</h2>
                                <button className="close-button" onClick={handleClose}>X</button>
                            </div>
                        }
                        <div className="custom-modal-content">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FullScreenModal;
