import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'
import GoogleAccountLogin from './GoogleAccountLogin'
import GoogleAccountLogout from './GoogleAccountLogout'
export default class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            token:'',
            refresh_token:'',
            error:'',
            login_success:false,
        }
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handlePasswordChange=this.handlePasswordChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleEmailChange(event){
        this.setState({
            email:event.target.value,
        })
    }
    handlePasswordChange(event){
        this.setState({
            password:event.target.value,
        })
        //console.log(this.state.password)
    }
    handleSubmit(event){
        event.preventDefault()
        Axios.post(`${this.props.hostname}/api/user/login`,{
            email:this.state.email,
            password:this.state.password
        }).then((response)=>{
            Cookies.set('token',response.data.token)
            Cookies.set('refresh_token',response.data.refresh_token)
            this.setState({
                token:Cookies.get('token'),
                login_success:response.data.success,
                error:''
            })
            this.props.history.push('/')
            // console.log(response.data)
            // console.log(this.state)
        }).catch((error)=>{
            this.setState({
                error:error.response.data.error
            })
            console.log(error.response.data)
        })
    }


    render() {
        return (
            <div>
                <h1> this is login page</h1>
                {this.state.error && <h3>{this.state.error}</h3>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <br/>
                        <input type='text' value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Password:
                        <br/>
                        <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                    </label>
                    <br/>
                    <br/>
                    <input type='submit' value='Submit'/>
                </form>
                <br/>
                <GoogleAccountLogin hist={this.props.history} hostname={this.props.hostname}/>
            </div>
        )
    }
}
