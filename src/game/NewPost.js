import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class NewPost extends Component {


    constructor(){
        super()
        this.state={
            title:'',
            content:'',
            error:''
        }

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    
    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        })

    }

    handleSubmit(event){
        const game_title=this.props.match.params.game_title
        event.preventDefault()
        console.log(this.state)
        Axios.post(`http://127.0.0.1:5000/api/game/${game_title}/new_post`,{
            title:this.state.title,
            content:this.state.content
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.setState({
                title:'',
                content:'',
                error:'post created'
            })
            setTimeout(() => {
                this.props.history.push(`/game/${game_title}/${response.data.post_id}`)
            }, 1000);
        }).catch(error=>{
            const code=error.response.status
            console.log(error.response)
            this.setState({
                error:error.response.data.msg
            })
            if (code==440){
                Axios.post('http://127.0.0.1:5000/api/user/refresh_token',{},{
                    headers:{
                        Authorization: 'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    Cookies.set('token',response.data.token)
                    this.setState({
                        error:''
                    })
                    window.location.reload();
                }).catch(error=>{
                    this.setState({
                        error:error.response.data.msg
                    })
                })
            }
        })
    }

    render() {

        

        
        return (
            <div>
                <h1>this is the page for creating new post</h1>
                {
                    this.state.error.length!==0 &&
                    <h2>{this.state.error}</h2>
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title: 
                        <br/>
                        <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Content:
                        <br/>
                        <textarea type='text' name='content' value={this.state.content} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <button>Submit</button>

                </form>
            </div>
        )
    }
}
