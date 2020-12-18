import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'

export default class DeleteResponse extends Component {
    constructor(){
        super()
        this.state={}
        this.handleDelete=this.handleDelete.bind(this)
    }

    

    handleDelete(event){
        // event.preventDefault()
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_parent_id=this.props.match.params.comment_parent_id
        const comment_id=this.props.match.params.comment_id
        Axios.delete(`${this.props.hostname}/api/game/${game_title}/${post_id}/${comment_parent_id}/${comment_id}/delete_response`,{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            //console.log('delete success')
            this.props.history.push(`/game/${game_title}/${post_id}`)
        }).catch(error=>{
            //console.log(error.response)
            Axios.post(`${this.props.hostname}/api/user/refresh_token`,{},{
                headers:{
                    Authorization:'refresh_token '+Cookies.get('refresh_token')
                }
            }).then(response=>{
                Cookies.set('token',response.data.token)
                this.props.history.push(`/game/${game_title}/${post_id}/${comment_parent_id}/${comment_id}/delete_response`)
            }).catch(error=>{
                this.props.history.push('/user/login')
            })
        })
    }



    render() {
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_parent_id=this.props.match.params.comment_parent_id
        const comment_id=this.props.match.params.comment_id
        return (
            <div>
                <h1>Are you sure deleting this response?</h1>
                <h3>Game: {game_title}</h3>
                <h3>Post id: {post_id}</h3>
                <h3>Comment parent id: {comment_parent_id}</h3>
                <h3>Comment id: {comment_id}</h3>

                <button onClick={this.handleDelete}>Delete!</button>
                

                
            </div>
        )
    }
}
