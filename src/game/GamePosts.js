import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import {Route,BrowserRouter as Router, Link, Switch} from'react-router-dom'

export default class GamePosts extends Component {
    constructor(){
        super()
        this.state={
            links:[],
            error:'',
            platform:[],
            posts:[],
            no_more_posts:false,
            pages:[]
        }
        this.handleLoad=this.handleLoad.bind(this)
    }

    componentDidMount(){
        const game_title=this.props.match.params.game_title
        Axios.get(`${this.props.hostname}/api/game/${game_title}`,{
            headers:{
                Authorization:'token '+Cookies.get('token') 
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({
                links:response.data.links,
                platform:response.data.platform,
                posts:response.data.posts,
                pages:response.data.pages
            })
        })
    }
    
    handleLoad(event){
        let next_page=''
        for(let i=0;i<this.state.pages.length;i++){
            if (this.state.pages[i].rel=='next') {
                next_page=this.state.pages[i].href
            }
            
        }
        console.log(next_page)
        if (next_page==='' || next_page===null){
            this.setState(
                {
                    no_more_posts:true
                }
            )
            return
        }
        Axios.get(`${this.props.hostname}${next_page}`,{
            headers:{
                Authorization:'token '+Cookies.get('token') 
            }
        }).then(response=>{
            console.log(response)
            this.setState({
                ...this.state,
                links:response.data.links,
                posts:[...this.state.posts,...response.data.posts],
                pages:response.data.pages
            })
        })
    }


    render() {
        const game_title=this.props.match.params.game_title
        return (
            <div>
                <h1>this is {this.props.match.params.game_title}</h1>
                {
                    this.state.platform.length!==0 && <h2>Platforms</h2>
                }
                <div>
                    {
                        this.state.platform.map((elem,i)=>{
                            return <p key={i}>{elem }</p>
                        })
                    }
                </div>
                <div>
                    {
                        this.state.links.map((elem,i)=>{
                            return <li key={i}>
                                <Link to={`/game/${game_title}/${elem.rel}`}>{elem.rel}</Link>
                            </li>
                        })
                    }
                </div>
                <br/>
                {
                    this.state.posts.map((elem,i)=>{
                        return <div className='post_view' key={i}>
                                <Link to={`/game/${game_title}/${elem.post_id}`} key={i}>{elem.title}</Link>
                                <p>Date posted: {elem.date_posted}</p>
                                <p>Author: {elem.author}</p>
                                <p>Abstract:{elem.abstract}</p>
                            </div>
                            
                        
                    })
                }
                <br/>
                {
                    this.state.no_more_posts &&
                    <h2>no more posts haha</h2>
                }
                <button onClick={this.handleLoad}>Load More ...</button>
            </div>
        )
    }
}
