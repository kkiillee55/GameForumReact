import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class RequestActivateAccount extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            error:''
        }

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleEmailChange=this.handleEmailChange.bind(this)
    }

    handleEmailChange(event){
        this.setState({
            email:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        console.log(this.state)
        Axios.post(`${this.props.hostname}/api/user/request_activate_account`,{
            email:this.state.email
        },{
            headers:{
                Authorization: 'token '+Cookies.get('token')
            }
        }).then(response=>{
            //console.log(response)
            this.setState({
                error:'activation email send, please check it'
            })
        }).catch(error=>{
            this.setState({
                error:error.response.data.msg
            })
        })
    }


    render() {
        return (
            <div>
                <h1>Request activate Account</h1>
                {
                    this.state.error.length!==0 &&
                    <h3>{this.state.error}</h3>
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <br/>
                        <input type='text' value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
