import {Col, Modal, Row} from "react-bootstrap";
import React from "react";
import Form from 'react-bootstrap/Form';
import ActionButtons from './RegistrationWizardActionButtons'
import './registration.css'
import {useDispatch, useSelector} from "react-redux";
import {selectValidationErrors, setValidationErrors} from "../../../redux/slices/errorSlice";
import InputWrapper from "../../app/InputWrapper";

export default function RegistrationUserDetailsStep(props: any) {
    const [info, setInfo] = React.useState({
        first_name: '',
        last_name: '',
        phone: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [error, setError] = React.useState("");
    const violations = useSelector(selectValidationErrors);
    const dispatch = useDispatch();


    const onInputChanged = (event: any) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setInfo((info) => ({
            ...info,
            [targetName]: targetValue
        }));
    };

    // useEffect(() => {
    //     if (violations?.length > 0) {
    //         setError("QQQQQQQQQQQQQQQQ");
    //     }
    // }, [violations]);

    const validate = () => {
        if (!info.first_name) {
            setError("First name is mandatory field");
        } else if (!info.new_password) {
            setError("Password must be provided");
        } else if (info.new_password !== info.new_password_confirmation) {
            setError("Password must match the confirmation field");
        } else {
            setError("");
            props.nextStep();
            props.userCallback(info);
        }
    };

    const goBack = () => {
        console.log('goBack');
        dispatch(setValidationErrors([]));
        props.previousStep();
    };

    return (
        <>
            <Modal.Body>
                <span style={{color: "red"}}>{error}</span>
                <h2>User Details</h2>
                <Form>
                    <Row>
                        <Col>
                            <InputWrapper inputName="first_name" violations={violations}>
                                <Form.Group>
                                    <Form.Label column="lg">First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        autoFocus
                                        onChange={onInputChanged}
                                    />
                                </Form.Group>
                            </InputWrapper>
                            <InputWrapper inputName="last_name" violations={violations}>
                                <Form.Group>
                                    <Form.Label column="lg">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        placeholder="Enter your last name"
                                        onChange={onInputChanged}
                                    />
                                </Form.Group>
                            </InputWrapper>
                            <InputWrapper inputName="phone" violations={violations}>
                                <Form.Group>
                                    <Form.Label column="lg">Phone number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        onChange={onInputChanged}
                                    />
                                </Form.Group>
                            </InputWrapper>
                            <InputWrapper inputName="new_password" violations={violations}>
                                <Form.Group>
                                    <Form.Label column="lg">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="new_password"
                                        onChange={onInputChanged}
                                    />
                                </Form.Group>
                            </InputWrapper>
                            <InputWrapper inputName="new_password_confirmation" violations={violations}>
                                <Form.Group>
                                    <Form.Label column="lg">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="new_password_confirmation"
                                        onChange={onInputChanged}
                                    />
                                </Form.Group>
                            </InputWrapper>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ActionButtons {...props} nextStep={validate} previousStep={goBack}/>
            </Modal.Footer>
        </>
    );
}
