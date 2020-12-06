import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class UpdateComment extends Component {
    constructor(){
        super()
        this.state={
            new_comment:'',
            error:''
        }
        this.handleCommentChange=this.handleCommentChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleCancel=this.handleCancel.bind(this)

    }

    handleCommentChange(event){
        this.setState({
            new_comment:event.target.value
        })

    }
    handleSubmit(event){

        event.preventDefault()
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        const comment_id=this.props.match.params.comment_id
        Axios.patch(`http://127.0.0.1:5000/api/game/${game_title}/${post_id}/${comment_id}/update_comment`,{
            comment_text:this.state.new_comment,
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log('comment updated')
            this.setState({
                new_comment:'',
                error:''
            })
            this.props.history.push(`/game/${game_title}/${post_id}`)
        }).catch(error=>{
            const code=error.response.status
            if (code==400){
                this.setState({
                    error:error.response.data.msg
                })
                console.log(this.state.error)
            }
            if (code==440){
                Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                    headers:{
                        Authorization:'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    Cookies.set('token',response.data.token)
                }).catch(error=>{
                    this.props.history.push('/user/login')
                })
            }
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
                <h1>this is update comment page</h1>
                <h3>Game:{this.props.match.params.game_title}</h3>
                <h3>Post id:{this.props.match.params.post_id}</h3>
                <h3>Comment id:{this.props.match.params.comment_id}</h3>
                
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.new_comment} onChange={this.handleCommentChange}></input>
                    <br/>
                    <button>Submit</button>
                </form>
                <br/>
                <button onClick={this.handleCancel}>Cancel</button>



            </div>
        )
    }
}
