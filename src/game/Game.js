import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
export default class Game extends Component {
    constructor(){
        super()
        this.state={
            links:[]
        }
    }

    componentDidMount(){
        Axios.get(`${this.props.hostname}/api/game/`,{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(resposne=>{
            this.setState({
                links:resposne.data.links
            })
        }).catch(error=>{
            console.log(error.resposne)
        })
    }

    render() {
        console.log(this.state.links)
        
        return (
            <div>
                <h1>this is game page</h1>
                {this.state.links.map((elem,i)=>{
                    return <li key={i}>
                        <Link to={`/game/${elem.rel}`} >{elem.rel}</Link>
                    </li>
                })}

            </div>
        )
    }
}
