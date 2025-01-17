import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className='overlay'>
            <div className='modal glass'>
                <button onClick={onClose} className='closeButton'>
                    ✖
                </button>
                {title && <h2 className='title'>{title}</h2>}
                <div className='content'>{children}</div>
                <div className="drops">
                    <div className="drop drop-1"></div>
                    <div className="drop drop-2"></div>
                    <div className="drop drop-3"></div>
                    <div className="drop drop-4"></div>
                    <div className="drop drop-5"></div>
                </div>
            </div>
        </div>
    );
};


export default Modal;