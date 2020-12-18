import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'

export default class UpdatePost extends Component {


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
        const post_id=this.props.match.params.post_id
        event.preventDefault()
        console.log(this.state)
        Axios.patch(`${this.props.hostname}/api/game/${game_title}/${post_id}/update`,{
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
                error:'post updated'
            })
            setTimeout(() => {
                this.props.history.push(`/game/${game_title}/${post_id}`)
            }, 1000);
        }).catch(error=>{
            const code=error.response.status
            console.log(error.response)
            this.setState({
                error:error.response.data.msg
            })
            if (code==440){
                Axios.post(`${this.props.hostname}/api/user/refresh_token`,{},{
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

    componentDidMount(){
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        Axios.get(`${this.props.hostname}/api/game/${game_title}/${post_id}/update`,{
            headers:{
                Authorization: 'refresh_token '+Cookies.get('refresh_token')
            }
        }).then(response=>{
            this.setState({
                title:response.data.title,
                content:response.data.content
            })
        })
    }

    render() {

        

        
        return (
            <div>
                <h1>this is the page for update current post</h1>
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
