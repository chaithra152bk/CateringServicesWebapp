import React, { useState } from 'react';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';

const CommonModal = React.forwardRef((props, ref) => {
    const {t} = props;
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({...props.modalData})
    const toggle = (modalData) => {
        setModalData(modalData)
        if(modalData){
            if(modalData.handleModalOpenClose)
            {
                modalData.handleModalOpenClose(open)
                setOpen(modalData.isModalOpen)
            }
            else{
                setOpen(!open);
            }
        }
        else{
            setOpen(!open);
        }
    }

    return (
        <Modal
            ref={ref}
            t={t}
            {...props}
            show={open}
            onHide={toggle}
            dialogClassName="custom-modal"
            backdrop={'static'}
            className={modalData&&modalData.modalType}
        >
            <Modal.Header closeButton>
            {modalData&&modalData.header}
                <Modal.Title id="contained-modal-title-lg">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalData&&modalData.body}
            </Modal.Body>
        </Modal>
    )
});

export default CommonModal;
