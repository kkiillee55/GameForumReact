import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class CreateResponse extends Component {
    constructor(){
        super()
        this.state={
            response:''
        }

        this.handleResponseChange=this.handleResponseChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }

    handleResponseChange(event){
        this.setState({
            response:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_id=this.props.match.params.comment_id
        console.log(this.state.response)
        Axios.post(`http://127.0.0.1/api/game/${game_title}/${post_id}/${comment_id}/create_response`,{
           comment_text:this.state.response 
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log(response.data)
        }).catch(error=>{
            console.log(error.response.data)
        })
    }




    render() {
        return (
            <div>
                <h1>Response to:</h1>
                <h3>Game: {this.props.match.params.game_title}</h3>
                <h3>Post id: {this.props.match.params.post_id}</h3>
                <h3>Comment id: {this.props.match.params.comment_id}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Your response:  
                        <br/>
                        <input type='text' value={this.state.response} onChange={this.handleResponseChange}></input>
                        <br/>
                        <button>Submit</button>
                    </label>
                </form>
            </div>
        )
    }
}
