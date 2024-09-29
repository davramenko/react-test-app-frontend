import {Nav} from "react-bootstrap";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

import "./Menu.css"
import {useSelector} from "react-redux";
import store, {IRootState} from "../../redux/store";
import {createUser, logout} from "../../redux/slices/authSlice";
import React, {useEffect} from "react";

export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = React.useState(createUser());

    const handleSelect = (eventKey: any) => {
        //console.log(eventKey);
        if (eventKey === '/login') {
            localStorage.removeItem('authToken');
            eventKey = {
                pathname: eventKey,
                search: createSearchParams({
                    'return-path': location.pathname
                }).toString()
            };
        }
        if (eventKey === '/logout') {
            store.dispatch(logout());
            eventKey = '/';
        }
        if (eventKey === '/resend_email_verification') {
            eventKey = '/';
        }
        navigate(eventKey);
    };

    const token = useSelector((state: IRootState) => state.auth.token);
    useEffect(() => {
        if (!token) {
            store.dispatch(logout());
        }
    }, [token]);

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson && (!user || user.id === 0)) {
            setUser(JSON.parse(userJson));
        }
    }, [user]);

    // noinspection HtmlUnknownTarget
    return (<>
            <header className="app-header">
                <h1>Test Application</h1>
            </header>
            <main className="app-main">
                <Nav
                    variant="pills"
                    id="controlled-tab"
                    className="nav-pills nav-fill"
                    onSelect={handleSelect}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="/" active={location.pathname === "/"}>Home</Nav.Link>
                    </Nav.Item>
                    {token && (<>
                        {user?.email_verified_at ? (<>
                            <Nav.Item>
                                <Nav.Link eventKey="/dashboard"
                                          active={location.pathname === "/dashboard"}>Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="/settings"
                                          active={location.pathname === "/settings"}>Settings</Nav.Link>
                            </Nav.Item>
                        </>) : (
                            <Nav.Item>
                                <Nav.Link eventKey="/resend_email_verification"
                                          active={location.pathname === "/resend_email_verification"}>Resent Email Verification</Nav.Link>
                            </Nav.Item>
                        )}
                        <Nav.Item>
                            <Nav.Link eventKey="/logout"
                                      active={location.pathname === "/logout"}>Logout</Nav.Link>
                        </Nav.Item>
                    </>)}
                    {!token && (
                        <Nav.Item>
                            <Nav.Link eventKey="/login"
                                      active={location.pathname === "/login"}>Login</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </main>
        </>
    );
}