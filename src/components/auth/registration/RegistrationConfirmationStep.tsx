import './registration.css'
import React, {useEffect} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import ActionButtons from "./RegistrationWizardActionButtons";
import {finishRegistration, selectAuthUser} from "../../../redux/slices/authSlice";
import store from "../../../redux/store";
import {useSelector} from "react-redux";
import {selectValidationErrors} from "../../../redux/slices/errorSlice";

export default function RegistrationConfirmationStep(props: any) {
    const user = useSelector(selectAuthUser);
    const violations = useSelector(selectValidationErrors);
    const [error, setError] = React.useState("");

    console.log("step3 receive user object");
    console.log(props.user);

    const handleRegisterUser = () => {
        console.log('handleLastStep: dispatch-finishRegistration');
        store.dispatch(finishRegistration(props.user));
    };

    const userSavedAction = () => {
        console.log('userSavedAction');
        setError("");
        props.nextStep();
    };
    useEffect(() => {
        if (user) {
            userSavedAction();
        }
    }, [user]);

    if (violations?.length > 0) {
        console.log('violations', violations);
        props.goToNamedStep('details');
    }

    return (
        <>
            <Modal.Body>
                <span style={{color: "red"}}>{error}</span>
                <h2>Please review user details</h2>
                <Row>
                    <Col>Email:</Col>
                    <Col>{props.user.email}</Col>
                </Row>
                <Row>
                    <Col>First name:</Col>
                    <Col>{props.user.first_name}</Col>
                </Row>
                <Row>
                    <Col>Last name:</Col>
                    <Col>{props.user.last_name}</Col>
                </Row>
                <Row>
                    <Col>Phone number:</Col>
                    <Col>{props.user.phone}</Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <ActionButtons {...props} nextStep={handleRegisterUser}/>
            </Modal.Footer>
        </>
    );
}