import StepWizard from 'react-step-wizard';
import Modal from "react-bootstrap/Modal";
import React from "react";
import queryString from "query-string";
import {useLocation, useNavigate} from "react-router-dom";
import {Step, Stepper} from "react-form-stepper";
import './registration.css'
import RegistrationCheckEmailStep from "./RegistrationCheckEmailStep";
import RegistrationUserDetailsStep from "./RegistrationUserDetailsStep";
import RegistrationConfirmationStep from "./RegistrationConfirmationStep";
import RegistrationWizardContext from "../../../context/RegistrationWizardContext";
import RegistrationFinishStep from "./RegistrationFinishStep";

export default function RegistrationWizard() {
    const [show, setShow] = React.useState(true);
    const [user, setUser] = React.useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepWizard, setStepWizard] = React.useState(null);
    const [registrationData, setRegistrationData] = React.useState({
        emailCheckedAction: null as any
    });

    const handleClose = () => {
        setShow(false);
        if (location.search) {
            const query = queryString.parse(location.search);
            if (query['return-path']) {
                navigate({
                    pathname: query['return-path']?.toString()
                });
            }
        }
    };

    const assignStepWizard = (instance: any) => {
        console.log(instance);
        setStepWizard(instance);
    };

    const assignUser = (val: any) => {
        console.log("parent receive user callback");
        console.log(val);
        setUser((user) => ({
            ...user,
            ...val
        }));
    };

    const handleStepChange = (e: any) => {
        console.log("step change");
        console.log(e);
        setActiveStep(e.activeStep - 1);
    };

    return (
        <RegistrationWizardContext.Provider value={{registrationData, setRegistrationData}}>
            <Modal show={show} onHide={handleClose} className="app-dialog" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    <Stepper activeStep={activeStep}>
                        <Step label="Check Email"/>
                        <Step label="Personal Detail"/>
                        <Step label="Confirmation"/>
                        <Step label="Finish"/>
                    </Stepper>
                </Modal.Header>
                <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
                    <RegistrationCheckEmailStep stepName="email" userCallback={assignUser} closeWizard={handleClose}/>
                    <RegistrationUserDetailsStep stepName="details" user={user} userCallback={assignUser}
                                                 closeWizard={handleClose}/>
                    <RegistrationConfirmationStep stepName="register" user={user} closeWizard={handleClose}/>
                    <RegistrationFinishStep stepName="finish" closeWizard={handleClose}/>
                </StepWizard>
            </Modal>
        </RegistrationWizardContext.Provider>
    );
}