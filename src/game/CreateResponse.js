import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class CreateResponse extends Component {
    constructor(){
        super()
        this.state={
            response:'',
            error:'',
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
        //console.log(this.state.response)
        Axios.post(`http://127.0.0.1:5000/api/game/${game_title}/${post_id}/${comment_id}/create_response`,{
           comment_text:this.state.response 
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            //console.log(response)
            this.setState({
                response:'',
                error:'',
            })
            this.props.history.push(`/game/${game_title}/${post_id}`)
            //console.log(this.props.history)
        }).catch(error=>{
            const code=error.response.status
            this.setState({
                error:error.response.data.msg
            })
            console.log(error.response)
            if (code===440){
                Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                    headers:{
                        Authorization: 'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    Cookies.set('token',response.data.token)
                    this.setState({
                        error:''
                    })
                }).catch(error=>{
                    if(error.response.status===440){
                        this.props.history.push('/user/login')
                    }
                })
            }
        })
    }




    render() {
        return (
            <div>
                {
                    this.state.error!=='' &&
                    <div className='error'>
                        {this.state.error}
                    </div>

                }

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
