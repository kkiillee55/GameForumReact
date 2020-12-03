import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class Logout extends Component {
    componentDidMount(){
        Cookies.set('token','')
        Cookies.set('refresh_token','')
        this.props.history.push('/')

    }
    render() {
        return (
            <div>
                <h1>Lotout page</h1>
                <h3>you are logged out</h3>                
            </div>
        )
    }
}
