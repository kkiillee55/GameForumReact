import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class Logout extends Component {
    componentDidMount(){

        Object.keys(Cookies.get()).forEach(function(cookieName) {
            var neededAttributes = {
              // Here you pass the same attributes that were used when the cookie was created
              // and are required when removing the cookie
            };
            Cookies.remove(cookieName, neededAttributes);
          });
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
