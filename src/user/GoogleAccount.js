import React, { Component } from 'react'
import GoogleAccountLogin from './GoogleAccountLogin'
import GoogleAccountLogout from './GoogleAccountLogout'
export default class GoogleAccount extends Component {
    render() {
        return (
            <div>
                
                <GoogleAccountLogin hist={this.props.history}/>
                <GoogleAccountLogout hist={this.props.history}/>
                
            </div>
        )
    }
}
