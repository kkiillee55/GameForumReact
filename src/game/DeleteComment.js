import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class DeleteComment extends Component {
    constructor(){
        super()
        this.state={}
        this.handleDelete=this.handleDelete.bind(this)
    }


    handleDelete(event){
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_id=this.props.match.params.comment_id
        Axios.delete(`http://127.0.0.1:5000/api/game/${game_title}/${post_id}/${comment_id}/delete_comment`,{
            headers:{
                Authorization: 'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.props.history.push(`/game/${game_title}/${post_id}`)
        }).catch(error=>{
            Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                headers:{
                    Authorization:'refresh_token '+Cookies.get('refresh_token')
                }
            }).then(response=>{
                Cookies.set('token',response.data.token)
                this.props.history.push(`/game/${game_title}/${post_id}/${comment_id}/delete_comment`)
            }).catch(error=>{
                this.props.history.push('/user/login')
            })
        })

    }



    render() {
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_id=this.props.match.params.comment_id
        return (
            <div>
                <h1>this is deledte comment page</h1>
                <h3>Game: {game_title}</h3>
                <h3>Post id: {post_id}</h3>
                <h3>Comment id: {comment_id}</h3>

                <button onClick={this.handleDelete}>Delete</button>



            </div>
        )
    }
}
