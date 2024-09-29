import './registration.css'
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

export default function ActionButtons(props: any) {
    const handleBack = () => {
        props.previousStep();
    };

    const handleNext = () => {
        props.nextStep();
    };

    const handleFinish = () => {
        props.lastStep();
    };

    const handleClose = () => {
        props.closeWizard();
    };

    return (
        <div>
            <Row>
                <Col>
                    <Button variant="secondary" onClick={handleClose} className="wizard-button">
                        Cancel
                    </Button>
                    {props.currentStep > 1 && (
                        <Button variant="secondary" onClick={handleBack} className="wizard-button">Back</Button>
                    )}
                    {props.currentStep < (props.totalSteps - 1) && (
                        <Button variant="primary" onClick={handleNext} className="wizard-button">Next</Button>
                    )}
                    {props.currentStep === (props.totalSteps - 1) && (
                        <Button variant="primary" onClick={handleNext} className="wizard-button">Register</Button>
                    )}
                    {props.currentStep === props.totalSteps && (
                        <Button variant="primary" onClick={handleFinish} className="wizard-button">Close</Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};