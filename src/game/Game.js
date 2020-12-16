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
        Axios.get('http://127.0.0.1:5000/api/game').then(resposne=>{
            this.setState({
                links:resposne.data.links
            })
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
