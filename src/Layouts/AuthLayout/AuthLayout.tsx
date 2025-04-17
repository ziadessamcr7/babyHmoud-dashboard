import React from 'react'
import SignIn from '../../Auth/SignIn/SignIn'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout