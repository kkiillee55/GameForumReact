import React, { Component } from 'react'
import {GoogleLogout} from 'react-google-login'
import Cookies from 'js-cookie'
const clientId='243060441327-51tqelje6aub0eptnj54v7pkk5t4nos9.apps.googleusercontent.com'
export default function GoogleAccountLogout() {
    
    const onSuccess=()=>{
        alert('Logout success')
        Cookies.set('token','')
        Cookies.set('refresh_token','')
    }
    
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            ></GoogleLogout> 
        </div>
    )
}
