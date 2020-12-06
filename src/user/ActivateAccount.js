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
        Axios.get(`http://127.0.0.1:5000/api/user/activate_account/${activate_token}`).then(response=>{
            this.setState({
                error:response.data.msg
            })
        }).catch(error=>{
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
