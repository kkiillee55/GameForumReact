import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'

export default class ForgotPassword extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            error:''
        }

        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleEmailChange(event){
        this.setState({
            email:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        Axios.post('http://127.0.0.1:5000/api/user/forgot_password',{
            email:this.state.email
        },{
            headers:{
                Authorization: 'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.setState({
                error:'password reset email sent!'
            })
        }).catch(error=>{
            const code=error.response.status
            //console.log(error.response)
            if(code==440){
                Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                    headers:{
                        Authorization: 'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    this.setState({
                        error:'you already logged in'
                    })
                }).catch(error=>{
                    
                })

            }else{
                this.setState({
                    error:error.response.data.msg
                })
            }
        })

    }

    render() {
        return (
            <div>
                <h1>this is forgot password page</h1>
                {
                    this.state.error.length!==0 &&
                    <h3>{this.state.error}</h3>
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <br/>
                        <input type='text' value={this.state.email} onChange={this.handleEmailChange}></input>
                    </label>
                    <br/>
                    <button>Submit</button>
                </form>
                
            </div>
        )
    }
}
