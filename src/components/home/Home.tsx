import "./Home.css"
import React, {useEffect} from "react";
import store from "../../redux/store";
import {createUser} from "../../redux/slices/authSlice";

export default function Home() {
    //let user: IUser | null = null;
    const [user, setUser] = React.useState(createUser());

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson && (!user || user.id === 0)) {
            setUser(JSON.parse(userJson));
        }
    }, [user]);

    store.subscribe(() => {
        const obj: any = store.getState().auth.user;
        if (obj?.id !== user?.id) {
            setUser(obj);
            console.log('Home: subscribe user changed: ', obj);
        }
    });

    return (
        <>
            <h1>Home</h1>
            {user && (
            <table width="50%">
                <tbody>
                <tr>
                    <td>Email</td>
                    <td>{user?.email}</td>
                </tr>
                <tr>
                    <td>First name:</td>
                    <td>{user?.first_name}</td>
                </tr>
                <tr>
                    <td>Last name:</td>
                    <td>{user?.last_name}</td>
                </tr>
                <tr>
                    <td>Phone number:</td>
                    <td>{user?.phone}</td>
                </tr>
                </tbody>
            </table>
            )}
        </>
    );
}
