import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
export default class Post extends Component {
    constructor(){
        super()
        this.state={
            author:'',
            comments:[],
            content:'',
            date_posted:'',
            title:'',
            links:[],
            your_comment:'',
            post_author_login:false

        }
        this.handleCommentChange=this.handleCommentChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleCommentChange(event){
        this.setState({
            your_comment:event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        Axios.post(`${this.props.hostname}/api/game/${game_title}/${post_id}/create_comment`,{
            comment_text:this.state.your_comment
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log(response.data)
            window.location.reload()
        }).catch(error=>{
            console.log(error.response.data)
            Axios.post(`${this.props.hostname}/api/user/refresh_token`,{},{
                headers:{
                    Authorization:'refresh_token '+Cookies.get('refresh_token')
                },
            }).then(response=>{
                Cookies.set('token',response.data.token)
                console.log('require refresh token', response.data)
                //window.location.reload(false)s
            }).catch(error=>{
                console.log('refresh token also expired' ,error.response.data)
                this.props.history.push('/user/login')
            })
        })
        
        

    }

    componentDidMount(){
        console.log(this.props)
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        Axios.get(`${this.props.hostname}/api/game/${game_title}/${post_id}`,{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({
                author:response.data.author,
                comments:response.data.comments,
                content:response.data.content,
                date_posted:response.data.date_posted,
                title:response.data.title,
                links:response.data.links,
                post_author_login:response.data.post_author_login
            })
        }).catch(error=>{
            console.log(error.response)
        })
        
    }


    render() {
        
        const ordered_comments=this.state.comments
        ordered_comments.sort((a,b)=>{
            return new Date(b.datetime)-new Date(a.datetime)
        })
        const game_title=this.props.match.params.game_title
        const post_id=this.props.match.params.post_id
        return (
            <div>
                <div className='post_info'>
                    <h1>{this.state.title}</h1>
                    <h3>{this.state.author}</h3>
                    <h3>{this.state.date_posted}</h3>
                    {
                        this.state.post_author_login && 
                        <Link className="smallLink" to={`/game/${game_title}/${post_id}/delete`}>Delete post</Link>
                    }
                    {
                        this.state.post_author_login && 
                        <Link className="smallLink" to={`/game/${game_title}/${post_id}/update`}>Update post</Link>
                    }


                </div>
                
                <p>{this.state.content}</p>

                <form onSubmit={this.handleSubmit}>
                    <input  type='text' value={this.state.your_comment} onChange={this.handleCommentChange}></input>
                    <br/>
                    <br/>
                    <button>Submit</button>
                </form>
                {ordered_comments.map((elem,i)=>{
                    const responses=elem.responses
                    const comment_id=elem.comment_id
                    responses.sort((a,b)=>{
                        return new Date(b.datetime)-new Date(a.datetime)
                    })
                    return (
                        <div key={i}>
                            <div className='comment' >
                                <h4>{elem.datetime}</h4>
                                <p>{elem.comment_text}</p>
                                {elem.links.map((elem,i)=>{
                                    const [comment_id,action]=elem.href.split('/').splice(5,6)
                                    return <Link className='smallLink' to={`/game/${game_title}/${post_id}/${comment_id}/${action}`} key={i}>{elem.rel}</Link>
                                })}
                                {responses.length!==0 &&  
                                    <div >
                                        <br/>
                                        Responses:
                                        {responses.map((elem,i)=>{
                                            return (
                                                <div className='response' key={i}>
                                                    <h4>{elem.datetime}</h4>
                                                    <h4>{elem.email}</h4>
                                                    <p>{elem.comment_text}</p>
                                                    {elem.links.map((elem,i)=>{
                                                        // console.log(elem)
                                                        const [comment_parent_id,comment_id,action]=elem.href.split('/').splice(5,7)
                                                        return <Link className='smallLink' to={`/game/${game_title}/${post_id}/${comment_parent_id}/${comment_id}/${action}`} key={i}>{elem.rel}</Link>
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                        
                    )
                })}
            </div>
        )
    }
}
