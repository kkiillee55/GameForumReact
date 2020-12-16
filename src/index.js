import {Component} from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'
import {Route,BrowserRouter as Router, Link, Switch} from'react-router-dom'
import Game from './game/Game'
import Post from './game/Post'
import CreateResponse from'./game/CreateResponse'
import UpdateResponse from './game/UpdateResponse'
import DeleteResponse from './game/DeleteResponse'
import UpdateComment from './game/UpdateComment'
import DeleteComment from './game/DeleteComment'
import Home from'./Home'

//user components
import User from './user/User'
import Login from './user/Login'
import GoogleAccount from './user/GoogleAccount'
import Logout from './user/Logout'
import Profile from './user/Profile'
import Register from './user/Register'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import RequestActivateAccount from'./user/RequestActivateAccount'
import ActivateAccount from './user/ActivateAccount'
import GamePosts from './game/GamePosts'
import NewPost from './game/NewPost'
import Follow from './game/Follow'
import Unfollow from'./game/Unfollow'

import Navbar from './Navbar'
import DeletePost from './game/DeletePost'
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
        if(refresh_token===undefined) Cookies.set('refresh_token','')
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
            <div>
                <Navbar/>
                <Router>           
                    <div>
                        <Route exact path='/user' component={User}/>
                        <Route exact path='/game'component={Game}/>
                        <Route exact path='/'component={Home}/>
                        <Route exact path='/user/login' component={Login}/>
                        <Route exact path='/user/logout' component={Logout}/>
                        <Route exact path='/user/profile' component={Profile}/>
                        <Route exact path='/user/register' component={Register}/>
                        <Route exact path='/user/forgot_password' component={ForgotPassword}/>
                        <Route exact path='/user/reset_password/:reset_token' component={ResetPassword}/>
                        <Route exact path='/user/request_activate_account' component={RequestActivateAccount}/>
                        <Route exact path='/user/activate_account/:activate_token' component={ActivateAccount}/>




                        <Route exact path='/game/:game_title' component={GamePosts}/>

                        <Route exact path='/game/:game_title/:post_id' component={Post}/>
                        <Route exact path='/game/:game_title/post/new_post' component={NewPost}/>
                        <Route exact path='/game/:game_title/:post_id/delete' component={DeletePost}/>
                        <Route exact path='/game/:game_title/action/follow' component={Follow}/>
                        <Route exact path='/game/:game_title/action/unfollow' component={Unfollow}/>

                        <Route exact path='/game/:game_title/:post_id/:comment_id/create_response' component={CreateResponse}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_parent_id/:comment_id/update_response' component={UpdateResponse}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_parent_id/:comment_id/delete_response' component={DeleteResponse}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_id/update_comment' component={UpdateComment}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_id/delete_comment' component={DeleteComment}/>
                        
                        {/* <Route exact path='/user/register' component={Register}/>
                        <Route exact path='/user/logout' component={Logout}/>
                        <Route exact path='/user/google login' component={GoogleLogin}/> */}
                    </div>
                </Router>
            </div>
        )
    }
}
  
  // ========================================
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
  