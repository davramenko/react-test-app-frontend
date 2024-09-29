import './registration.css'
import React, {useEffect} from "react";
import Form from 'react-bootstrap/Form';
import ActionButtons from './RegistrationWizardActionButtons'
import {Col, Modal, Row} from "react-bootstrap";
import store from "../../../redux/store";
import {checkEmail, selectAuthEmailChecked, setEmailUnchecked} from "../../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

export default function RegistrationCheckEmailStep(props: any) {
    const emailChecked = useSelector(selectAuthEmailChecked);
    const [info, setInfo] = React.useState({email: ''});
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();

    const onInputChanged = (event: any) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setInfo((info) => ({
            ...info,
            [targetName]: targetValue
        }));
    };

    const validate = () => {
        dispatch(setEmailUnchecked());
        if (!info.email) {
            setError("Email is mandatory field");
        } else {
            console.log('validate: dispatch-checkEmail');
            store.dispatch(checkEmail(info.email));
        }
    };

    const emailCheckedAction = () => {
        console.log('emailCheckedAction');
        setError("");
        props.nextStep();
        props.userCallback(info);
    };
    useEffect(() => {
        if (emailChecked) {
            emailCheckedAction();
        }
    }, [emailChecked]);

    return (
        <>
            <Modal.Body>
                <span style={{color: "red"}}>{error}</span>
                <h2>User email verification</h2>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="email" column="lg">Email: </Form.Label>
                                <Form.Control
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    onChange={onInputChanged}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <ActionButtons {...props} nextStep={validate}/>
            </Modal.Footer>
        </>
    );
};
