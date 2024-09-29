import '../../App.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

export default function ModalDialog(props: any) {
    const [show, setShow] = React.useState(true);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose} className="app-dialog" centered>
            <Modal.Header closeButton>
                <Modal.Title>{ props.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { props.question }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={props.handleAction}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );

}