import Axios from 'axios'
import React, { Component } from 'react'

export default class ActivateAccount extends Component {
    constructor(){
        super()
        this.state={
            error:''
        }
    }

    componentDidMount(){
        const activate_token=this.props.match.params.activate_token
        Axios.get(`https://177ggaplp6.execute-api.us-east-2.amazonaws.com/test?token=${activate_token}`).then(response=>{
            console.log(response)
            this.setState({
                error:response.data.msg
            })
        }).catch(error=>{
            console.log(error)
            this.setState({
                error:error.response.data.msg
            })
        })
    }


    render() {
        return (
            <div>
                <h1>this is activateion page</h1>
                {
                    this.state.error.lrngth!==0 &&
                    <h3> {this.state.error}</h3>
                }
                
            </div>
        )
    }
}
