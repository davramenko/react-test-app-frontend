import { Outlet } from 'react-router-dom'
import Menu from '../components/menu/Menu'
import React from "react";

export default function MainLayout() {
    return (
        <>
            <Menu/>
            <Outlet/>
        </>
    )
}