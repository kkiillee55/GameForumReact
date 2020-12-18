import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class UpdateResponse extends Component {
    constructor(){
        super()
        this.state={
            updated_response:'',
            error:''
        }
        this.handleUpdateResponse=this.handleUpdateResponse.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }

    handleUpdateResponse(event){
        this.setState({
            updated_response:event.target.value
        })
    }

    handleCancel(event){
        event.preventDefault()
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        this.props.history.push(`/game/${game_title}/${post_id}`)
    }

    handleSubmit(event){
        event.preventDefault()
        // console.log(this.state.updated_response)
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_parent_id=this.props.match.params.comment_parent_id
        const comment_id=this.props.match.params.comment_id
        Axios.patch(`${this.props.hostname}/api/game/${game_title}/${post_id}/${comment_parent_id}/${comment_id}/update_response`,{
            comment_text:this.state.updated_response
        },{
            headers:{
                Authorization: 'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log(response)
            this.props.history.push(`/game/${game_title}/${post_id}`)
        }).catch(error=>{
            console.log(error.response)
            const code=error.response.status
            console.group(code)
            if (code===440){
                Axios.post(`${this.props.hostname}/api/user/refresh_token`,{},{
                    headers:{
                        Authorization: 'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    //console.log(response.data)
                    Cookies.set('token',response.data.token)
                }).catch(error=>{
                    this.props.history.push('/user/login')
                })
            }
        })
    }




    render() {
        return (
            <div>
                <h1>this is update rsponse</h1>
                <h3>Game: {this.props.match.params.game_title}</h3>
                <h3>Post id: {this.props.match.params.post_id}</h3>
                <h3>Comment paretn id: {this.props.match.params.comment_parent_id}</h3>
                <h3>Comment id: {this.props.match.params.comment_id}</h3>

                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.updated_response} onChange={this.handleUpdateResponse}></input>
                    <br/>
                    <br/>
                    <button>Submit</button>
                </form>
                <br/>
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        )
    }
}
