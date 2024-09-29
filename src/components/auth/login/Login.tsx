import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import queryString from 'query-string';
import './Login.css';
import {checkLogin, getCurrentUser} from "../../../redux/slices/authSlice";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";
import store from "../../../redux/store";
import {Col, Row} from "react-bootstrap";
// import {setError} from "../../../redux/slices/errorSlice";

export default function Login() {
    const [show, setShow] = React.useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [count, setCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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

    const handleLogin = () => {
        store.dispatch(checkLogin({username, password}));
    };

    const handleRegister = () => {
        console.log('handleRegister: return-path: ', location.pathname);
        console.log('handleRegister: location.search: ', location.search);
        let returnPath = location.pathname;
        if (location.search) {
            const query = queryString.parse(location.search)
            if (query['return-path']) {
                returnPath = query['return-path']?.toString()
            }
        }
        console.log('handleRegister: return-path: ', returnPath);
        navigate({
            pathname: "/register",
            search: createSearchParams({
                'return-path': returnPath,
            }).toString()
        });
    };

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setCount((count: number) => count + 1);
            } else {
                console.log('Login: token: ', token);
                store.dispatch(getCurrentUser(null));
                handleClose();
            }
        }, 300);
    }, [count])

    return (
        <Modal show={show} onHide={handleClose} className="app-dialog" centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="loginForm.Username">
                        <Form.Label column="lg">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginForm.Password">
                        <Form.Label column="lg">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleRegister}>Register</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}