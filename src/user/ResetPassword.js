import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class ResetPassword extends Component {
    constructor(){
        super()
        this.state={
            error:'',
            password:'',
            confirm_password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }



    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        console.log(this.state)
        const reset_token=this.props.match.params.reset_token
        Axios.post(`http://127.0.0.1:5000/api/user/reset_password/${reset_token}`,{
            password:this.state.password,
            confirm_password:this.state.confirm_password
        },{
            headers:{
                Authorization:'token '+ Cookies.get('token')
            }
        }).then(response=>{
            //console.log(this.state)
            this.setState({
                password:'',
                confirm_password:'',
                error:'password rest success!'
            })
            setTimeout(() => {
                this.props.history.push('/user/login')
            }, 1000);
        }).catch(error=>{
            this.setState({
                password:'',
                confirm_password:'',
                error:error.response.data.msg
            })
        })

    }


    render() {
        return (
            <div>
                <h1>this is hidden reseet password page</h1>
                <h1>Only the one received the link can access this page</h1>      
                {
                    this.state.error.length!==0 &&
                    <h3>{this.state.error}</h3>
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Password:
                        <br/>
                        <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Coonfirm password:
                        <br/>
                        <input type='text' name='confirm_password' value={this.state.confirm_password} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <button>Submit</button>

                </form>


            </div>
        )
    }
}
