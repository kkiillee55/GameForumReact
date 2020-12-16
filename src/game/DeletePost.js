import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class DeletePost extends Component {
    constructor(){
        super()
        this.state={
            error:''
        }


        this.handleDelete=this.handleDelete.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }


    handleDelete(event){
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        Axios.delete(`http://127.0.0.1:5000/api/game/${game_title}/${post_id}/delete`,{
            headers:{
                Authorization: 'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.props.history.push(`/game/${game_title}`)
        }).catch(error=>{
            Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                headers:{
                    Authorization:'refresh_token '+Cookies.get('refresh_token')
                }
            }).then(response=>{
                Cookies.set('token',response.data.token)
                this.props.history.push(`/game/${game_title}/${post_id}/delete`)
            }).catch(error=>{
                this.props.history.push('/user/login')
            })
        })

    }
    
    handleCancel(event){
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id

        this.props.history.push(`/game/${game_title}/${post_id}`)

    }






    render() {
        return (
            <div>
                <h1>this is delete post page</h1>
                <h1>are you sure you wanna delete this post?</h1>
                
                <button onClick={this.handleDelete}>Delete</button>
                <br/>
                <br/>
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        )
    }
}
