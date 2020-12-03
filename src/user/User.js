import Axios from 'axios'
import React, { Component } from 'react'
import {Route,BrowserRouter as Router, Link, Switch} from'react-router-dom'
import Login from './Login'
import Cookies from 'js-cookie'
export default class User extends Component {
    constructor(){
        super()
        this.state={
            links:[],
            msg:''
        }
    }

    componentDidMount(){
        //so why do i need to add trailing slash after user?
        Axios.get('http://127.0.0.1:5000/api/user/',{
            headers:{
                Authorization: 'token '+Cookies.get('token'),
            }
        }).then(response=>{
            this.setState({
                links:response.data.links,
                msg:response.data.msg
            })
        })
    }
    render() {
        //console.log(this.state)
        return (
            <div>
                <h1>This is user page</h1>
                {this.state.links.map((elem,i)=>{
                    return (
                        <div key={i}>
                            <Link to={`/user/${elem.rel}`} >{elem.rel}</Link>
                            <br/>
                        </div>
                    )
                })}
                {/* <Link to='/user/login'>login</Link> */}
            </div>
        )
    }
}
