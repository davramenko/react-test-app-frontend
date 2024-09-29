import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";
import Home from "./components/home/Home";
import './App.css';
import Login from "./components/auth/login/Login";
import Error from "./components/error/Error";
import RegistrationWizard from "./components/auth/registration/RegistrationWizard";
import ConfirmEmail from "./components/auth/registration/ConfirmEmail";
import ResendEmailVerification from "./components/auth/registration/ResendEmailVerification";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<RegistrationWizard/>}/>
                        <Route path="confirm_email" element={<ConfirmEmail/>}/>
                        <Route path="resend_email_verification" element={<ResendEmailVerification/>}/>
                    </Route>
                </Routes>
                <Error/>
            </div>
        </BrowserRouter>
    );
}

export default App;
