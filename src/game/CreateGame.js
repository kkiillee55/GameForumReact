import Axios from 'axios'
import React, { Component } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format'
import Cookies from 'js-cookie'
export default class CreateGame extends Component {
    constructor(){
        super()
        this.state={
            game_title:'',
            release_date:'',
            platforms:[],
            existing_platforms:[],
            msg:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handlePlatform=this.handlePlatform.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleDayChange=this.handleDayChange.bind(this)
    }


    componentDidMount(){
        Axios.get(`${this.props.hostname}/api/game/platforms`).then(response=>{
            this.setState({
                existing_platforms:response.data.platforms.map((elem,i)=>{return [elem,false]})
            })
        })
    }

    handleChange(event){
        this.setState({
            game_title:event.target.value
        })

    }
    handleDayChange(day){
        this.setState({
            release_date:dateFnsFormat(day,'yyyy-MM-dd')
        })
    }
    handlePlatform(event){
        //console.log(`${event.target.name} clicked`)
        //console.log(`status: ${event.target.checked} `)
        let existing_platforms=this.state.existing_platforms
        existing_platforms.forEach((elem,i)=>{
            if (elem[0]===event.target.name) existing_platforms[i][1]=event.target.checked
        })
        console.log(existing_platforms)
        this.setState({
            existing_platforms:existing_platforms
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const existing_platforms=this.state.existing_platforms
        let platforms=[]
        existing_platforms.forEach((elem,i)=>{
            if (elem[1]) platforms.push(elem[0])
        })
        
        this.setState({
            platforms:platforms
        })

        console.log(this.state)
        Axios.post(`${this.props.hostname}/api/game/create-game`,{
            game_title:this.state.game_title,
            release_date:this.state.release_date,
            platforms:platforms
        },{
            headers:{
                Authorization:'token '+Cookies.get('token')
            }
        }).then(response=>{
            this.props.history.push(`/game/${this.state.game_title}`)
        }).catch(error=>{
            // this.props.history.push(`/game`)
            this.setState({
                msg:error.response.data.msg
            })
            console.log('error:',error.response)
        })
        

    }


    render() {
        console.log(this.state)
        return (
            <div>
                {
                    this.state.msg!=='' &&
                    <h1>{this.state.msg}</h1>
                }
                <form onSubmit={this.handleSubmit}>

                    <label>
                        Game Title:
                        <br/>
                        <input name='game_title' value={this.state.game_title} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Release Date:
                        <br/>
                        {/* <input name='release_date' value={this.state.render} onChange={this.handleChange}/> */}
                        <DayPickerInput onDayChange={this.handleDayChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Platforms:
                        <br/>
                        {
                            this.state.existing_platforms.map((elem,i)=>{
                                return <div key={i}>
                                    <input key={i} type='checkbox' name={elem[0]} value={this.state.existing_platforms[i][1]} onClick={this.handlePlatform}/> {elem}
                                </div> 
                                
                            })
                        }
                    </label>
                    <br/>
                    <br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
