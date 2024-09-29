import './registration.css'
import {Col, Modal, Row} from "react-bootstrap";
import ActionButtons from "./RegistrationWizardActionButtons";
import React from "react";

export default function RegistrationFinishStep(props: any) {
    const handleLastStep = () => {
        props.closeWizard();
    };

    console.log("step4");

    return (<>
        <Modal.Body>
            <h2>Finishing registration</h2>
            <Row><Col>&nbsp;</Col></Row>
            <Row>
                <Col>Check your email inbox to find the message from us. It contains a link to complete the
                    registration.</Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <ActionButtons {...props} lastStep={handleLastStep}/>
        </Modal.Footer>
    </>)
}