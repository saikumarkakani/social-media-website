import { useEffect, useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';

function ModalPopup({ open, title, closeModal, children, actions }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(open);
    }, [open]);

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                    <CloseButton onClick={closeModal}></CloseButton>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                {actions && <Modal.Footer>{actions}</Modal.Footer>}
            </Modal>
        </div>
    );
}

export default ModalPopup;
