import {useLocation, useNavigate} from "react-router-dom";
import queryString from 'query-string';
import {useSelector} from "react-redux";
import {
    confirmEmail,
    selectAuthEmailConfirmationStatus,
} from "../../../redux/slices/authSlice";
import './registration.css';
import {useEffect} from "react";
import store from "../../../redux/store";

export default function ConfirmEmail() {
    const emailConfirmationStatus = useSelector(selectAuthEmailConfirmationStatus);
    const navigate = useNavigate()
    const location = useLocation();
    const query = queryString.parse(location.search);

    useEffect(() => {
        if (emailConfirmationStatus === 'pending') {
            store.dispatch(confirmEmail(query));
        }
    }, [query, emailConfirmationStatus]);

    useEffect(() => {
        if (emailConfirmationStatus !== 'pending') {
            navigate('..');
        }
    }, [emailConfirmationStatus, navigate]);

    return (
        <></>
    );
}