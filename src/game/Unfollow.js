import React, { Component } from 'react'
import Axios from'axios'
import Cookies from 'js-cookie'
export default class Unfollow extends Component {

    constructor(){
        super()
        this.state={
            error:''
        }
        this.handleGoback=this.handleGoback.bind(this)
        this.handleUnfollow=this.handleUnfollow.bind(this)
    }


    handleGoback(event){
        const game_title=this.props.match.params.game_title
        this.props.history.push(`/game/${game_title}`)

    }

    handleUnfollow(event){
        const game_title=this.props.match.params.game_title
        Axios.post(`${this.props.hostname}/api/game/${game_title}/unfollow`,{},{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log('unfollow:',response)
            this.setState({
                error:response.data.msg
            })

            setTimeout(() => {
                this.props.history.push(`/game/${game_title}`) 
            }, 1000);
        }).catch(error=>{
            console.log('error in unfollow: ',error.response)
            const code=error.response.status
            if(code==440){
                Axios.post(`${this.props.hostname}/api/user/refresh_token`,{},{
                    headers:{
                        Authorization:'refresh_token '+Cookies.get('refresh_token')
                    }
                }).then(response=>{
                    this.setState({
                        error:''
                    })
                    window.location.reload()
                }).catch(error=>{
                    this.setState({
                        error:error.response.data.msg
                    })
                })

            }else{
                this.setState({
                    error:error.response.data.msg
                })
            }
        })

    }



    render() {
        return (
            <div>
                <h1>are you sure to unfollow this game?</h1>
                {/* {
                    this.status.error.length!==0 &&
                    <h1>{this.state.error}</h1>
                } */}
                <button onClick={this.handleUnfollow}>Unfollow!</button>
                <br/>
                <br/>
                <button onClick={this.handleGoback}>Go Back</button>
            </div>
        )
    }
}
