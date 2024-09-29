import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Error.css'
import {useSelector} from "react-redux";
import store, {IRootState} from "../../redux/store";
import {useEffect} from "react";
import {resetError} from "../../redux/slices/errorSlice";

export default function Error() {
    const errorMessage = useSelector((state: IRootState) => state.error.errorMessage)

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            store.dispatch(resetError());
        }
    }, [errorMessage]);

    return (<ToastContainer position="top-right" autoClose={5000}/>);
}
