import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class DeleteGame extends Component {
    constructor(){
        super()
        this.state={
            posts:0,
            followers:0,
            platform:'',
            release_date:'',
            msg:''
        }
        this.handleDelete=this.handleDelete.bind(this)
    }

    componentDidMount(){
        const game_title=this.props.match.params.game_title
        Axios.get(`${this.props.hostname}/api/game/${game_title}/details`).then(response=>{
            this.setState({
                posts:response.data.posts,
                followers:response.data.followers,
                platform:response.data.platform.join(', '),
                release_date:response.data.release_date
            })
        }).catch(error=>{
            this.setState({
                msg:error.response.data.msg
            })
        })

    }

    handleDelete(event){
        const game_title=this.props.match.params.game_title
        Axios.delete(`${this.props.hostname}/api/game/${game_title}/delete`,{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.props.history.push('/game')
        }).catch(error=>{
            this.setState(
                {
                    msg:error.response.data.msg
                }
            )
        })

    }


    render() {
        const game_title=this.props.match.params.game_title
        console.log(this.state)
        return (
            <div>
                {
                    this.state.msg!=='' &&
                    <h1>{this.state.msg}</h1>
                }

                <h1>{game_title}</h1>
                <h3>Posts: {this.state.posts}</h3>
                <h3>Followers: {this.state.followers}</h3>
                <h3>Platforms: {this.state.platform}</h3>
                <h3>Release date: {this.state.release_date}</h3>
                <br/>

                <p>
                    Are you sure you want to delete {game_title}?
                    All posts and comments will be deleted.
                </p>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}
