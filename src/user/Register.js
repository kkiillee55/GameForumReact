import Axios from 'axios';
import React, { Component } from 'react'

export default class Register extends Component {

    constructor(){
        super()   
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            address:'',
            error:'',
            suggestions:[],
            choose_address_from_suggestions:false,
        }     
        
        this.handleChange=this.handleChange.bind(this)
        this.handleAddressChange=this.handleAddressChange.bind(this)
        this.setAddress=this.setAddress.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }



    handleChange(event){
        const value=event.target.value
        this.setState({
            ...this.state,
            [event.target.name]:value
        })
        //console.log(this.state)

    }
    handleAddressChange(event){
        const value=event.target.value
        this.setState({
            address:value
        })
        Axios.get(`${this.props.hostname}/api/user/address_auto_complete`,{params:{address:value}}).then(response=>{
            //console.log(response.data.suggestions)
            this.setState({
                choose_address_from_suggestions:false,
                suggestions:response.data.suggestions
            })
        }).catch(error=>{
            //console.log(error.response)
            this.setState({
                choose_address_from_suggestions:false,
                suggestions:[]
            })
        })
    }

    setAddress(event){
        //console.log(event.target.value)
        this.setState({
            address:event.target.value,
            choose_address_from_suggestions:true,
            suggestions:[]
        })
    }

    handleSubmit(event){
        event.preventDefault()
        console.log(this.state)
        if(this.state.choose_address_from_suggestions===false){
            this.setState({
                error:'please chose address from the drop down list'
            })
            return
        }
        Axios.post(`${this.props.hostname}/api/user/register`,{
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password,
            address:this.state.address
        }).then(response=>{
            this.setState({
                error:''
            })
            alert('please check you email for activation link')
            window.location.reload()
        }).catch(error=>{
            console.log(error.response)
            this.setState({
                error:error.response.data.msg
            })
        })
    }
    

    render() {
        return (
            <div>
                <h1>smarty streets</h1>
                
                {
                    this.state!==undefined && this.state.error.length!==0 &&
                    <h2>{this.state.error}</h2>
                
                }

                <form onSubmit={this.handleSubmit}>
                    <label>
                        First name:
                        <input type='text' name='first_name' value={this.state.first_name} onChange={this.handleChange}></input>
                        <br/>
                    </label>
                    <label>
                        Last name:
                        <input type='text' name='last_name' value={this.state.last_name} onChange={this.handleChange}></input>
                        <br/>
                    </label>
                    <label>
                        Email:
                        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}></input>
                        <br/>
                    </label>
                    <label>
                        Password:
                        <input type='text' name='password' value={this.state.password} onChange={this.handleChange}></input>
                        <br/>
                    </label>
                    <label>
                        Address:
                        <input type='text' name='address' value={this.state.address} onChange={this.handleAddressChange}></input>
                        {
                            this.state.suggestions.length!==0 && 
                            <div className='address_suggestion_area'>
                                {this.state.suggestions.map((elem,i)=>{
                                    return (
                                        <div  key={i}>
                                            <button className='address_suggestion' onClick={this.setAddress} value={elem}>{elem}</button>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <br/>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}



