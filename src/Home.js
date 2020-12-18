import React, { Component } from 'react'
import Axios from'axios'
import {Route,BrowserRouter as Router, Link, Switch} from'react-router-dom'
export default class Home extends Component {
    constructor(){
        super()
        this.state={
            links:[],
            msg:""
        }
    }


    componentDidMount(){
        Axios.get(`${this.props.hostname}/api/index/`).then(res=>{
            this.setState({
                links:res.data.links,
                msg:res.data.msg
            })
        })
    }

    render() {
        return (
            <div>
                <h1>This is home page</h1>
                <nav>
                    <ul>
                        {this.state.links.map((elem,i)=>{
                            return(
                                <li key={i}>
                                    <Link to={{
                                        pathname:`${elem.rel}`,
                                    }}>{elem.rel}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        )
    }
}

