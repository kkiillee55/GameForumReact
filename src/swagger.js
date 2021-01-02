import Axios from 'axios'
import React, { Component } from 'react'

export default class swagger extends Component {
    constructor(){
        this.state={
            swg:''
        }

    }
    
    componentDidMount(){
        Axios.get('')
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
