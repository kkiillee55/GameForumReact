import {Component} from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'
import {Route,BrowserRouter as Router, Link, Switch} from'react-router-dom'
import Game from './game/Game'
import Post from './game/Post'
import CreateResponse from'./game/CreateResponse'
import Home from'./Home'

//user components
import User from './user/User'
import Login from './user/Login'
import Logout from './user/Logout'
import Profile from './user/Profile'


class App extends Component{
    constructor(){
        super()
        this.state={
            links:[],
            msg:""
        }
    }


    componentDidMount(){
        const token=Cookies.get('token')
        const refresh_token=Cookies.get('refresh_token')
        if(token==undefined) Cookies.set('token','')
        if(refresh_token==undefined) Cookies.set('refresh_token','')
        Axios.get('http://127.0.0.1:5000/api/index').then(res=>{
            this.setState({
                links:res.data.links,
                msg:res.data.msg
            })
        })
    }


    render(){
        return(
            //seems we have to define all routes here 
            //and user links in sub components
            <Router>
                <div>
                    <Route exact path='/user' component={User}/>
                    <Route exact path='/game'component={Game}/>
                    <Route exact path='/'component={Home}/>
                    <Route exact path='/user/login' component={Login}/>
                    <Route exact path='/user/logout' component={Logout}/>
                    <Route exact path='/user/profile' component={Profile}/>

                    <Route exact path='/game/:game_title/:post_id' component={Post}/>
                    <Route exact path='/game/:game_title/:post_id/:comment_id/create_response' component={CreateResponse}/>

                    {/* <Route exact path='/user/register' component={Register}/>
                    <Route exact path='/user/logout' component={Logout}/>
                    <Route exact path='/user/google login' component={GoogleLogin}/> */}
                </div>
            </Router>
        )
    }
}
  
  // ========================================
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
  