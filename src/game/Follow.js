import Axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
export default class Follow extends Component {
    constructor(){
        super()
        this.state={
            error:''
        }
        this.handleFollow=this.handleFollow.bind(this)
    }


    handleFollow(event){
        const game_title=this.props.match.params.game_title
        Axios.post(`${this.props.hostname}/api/game/${game_title}/follow`,{},{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            console.log(response)
            this.setState({
                error:response.data.msg
            })

            setTimeout(() => {
                this.props.history.push(`/game/${game_title}`) 
            }, 1000);
        }).catch(error=>{
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

                <h1>click button to follow this game</h1>
                {/* {
                    this.status.error!==undefined && this.status.error.length!==0 &&
                    <h1>{this.state.error}</h1>
                } */}
                <button onClick={this.handleFollow}>Follow</button>
                
            </div>
        )
    }
}
