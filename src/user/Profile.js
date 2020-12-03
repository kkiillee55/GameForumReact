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
            status:''

        }
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
                status:response.data.status
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
            })
        })
    }


    render() {
    
        return (
            <div>
                <h1>this is profile page!!</h1>
                <div className='profile_user_info'>
                    <ul>
                        <li>Email: {this.state.email}</li>
                        <li>Firstname: {this.state.first_name}</li>
                        <li>Lastname: {this.state.last_name}</li>
                        <li>Status: {this.state.status}</li>
                    </ul>
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
