import React, { Component } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

export default class Profile extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            first_name:'',
            last_name:'',
            links:[],
            posts:[],
            status:'',
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

    componentDidMount(){
        //so why i do not need to add trailing slash after profile?
        Axios.get('http://127.0.0.1:5000/api/user/profile',{
            headers:{
                Authorization:'token '+Cookies.get('token') 
            }
        }).then(response=>{
            this.setState({
                email:response.data.email,
                first_name:response.data.first_name,
                last_name:response.data.last_name,
                links:response.data.links,
                posts:response.data.posts,
                status:response.data.status,
                address:response.data.address
            })
        }).catch(error=>{
            console.log('token expired',error.response.data)
            //post request
            //Axios.post(href, data, header)
            //empty data, header contain authorization
            Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                headers:{
                    Authorization:'refresh_token '+Cookies.get('refresh_token')
                },
            }
            ).then(response=>{
                //console.log('get refresh token',response)
                Cookies.set('token',response.data.token)
            }).catch(error=>{
                console.log('refresh token also expired,please login first ',error.response)
                this.props.history.push('/user/login')
            })
        })
    }

    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        })
    }
    handleAddressChange(event){
        const value=event.target.value
        this.setState({
            address:value
        })
        Axios.get(`http://127.0.0.1:5000/api/user/address_auto_complete`,{params:{address:value}}).then(response=>{
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
        Axios.patch('http://127.0.0.1:5000/api/user/profile',{
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password,
            address:this.state.address
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.setState({
                error:''
            })
            alert('Profile Updated')
            window.location.reload()
        }).catch(error=>{
            const code=error.response.status
            console.log(error.response)
            if (code!==440){
                this.setState({
                    error:error.response.data.msg
                })
            }else{
                Axios.post('http://127.0.0.1:5000/api/user.refresh_token',{},{
                    headers:{
                        Authorization:'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    Cookies.set('token',response.data.token)
                    window.location.reload()
                }).catch(error=>{
                    alert('session expired pls login again')
                    this.props.history.push('/user')
                })
            }
        })

    }


    render() {
    
        return (
            <div>
                <h1>this is profile page!!</h1>
                {
                    this.state.error.length!==0 &&
                    <h2>{this.state.error}</h2>
                
                }
                <div className='profile_user_info'>

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Email: {this.state.email}
                        </label>
                        <br/>
                        <label>
                            Firstname:
                            <input type='text' name='first_name' value={this.state.first_name} onChange={this.handleChange}></input>
                        </label>
                        <br/>
                        <label>
                            Lastname:
                            <input type='text' name='last_name' value={this.state.last_name} onChange={this.handleChange}></input>
                        </label>
                        <br/>
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
                        </label>
                        <br/>
                        <label>
                            Status:
                            {this.state.status}
                        </label>
                        <br/>
                        <button>Submit</button>
                    </form>
{/* 

                    <ul>
                        <li>Email: {this.state.email}</li>
                        <li>Firstname: {this.state.first_name}</li>
                        <li>Lastname: {this.state.last_name}</li>
                        <li>Address: {this.state.address}</li>
                        <li>Status: {this.state.status}</li>
                    </ul> */}
                </div>
                <div>
                    {this.state.posts.map((elem,i)=>{
                        const game_info=elem.href.split('/').slice(1)
                        return (
                            <div key={i} className='profile_post_info'>
                                <p>Post title:{elem.title}</p>
                                <p>Post info: {elem.abstract}</p>
                                Post link: <Link to={`/game/${game_info[2]}/${game_info[3]}`}>Post {`${game_info[3]}`}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
