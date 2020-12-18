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
import DeletePost from './game/DeletePost'
import UpdatePost from './game/UpdatePost'
import Navbar from './Navbar'

class App extends Component{
    constructor(){
        super()
        this.state={
            links:[],
            msg:""
        }
    }


    componentDidMount(){
        const hostname='http://game-env.eba-9fppu8jx.us-east-2.elasticbeanstalk.com'
        const token=Cookies.get('token')
        const refresh_token=Cookies.get('refresh_token')
        if(token==undefined) Cookies.set('token','')
        if(refresh_token===undefined) Cookies.set('refresh_token','')
        Axios.get(`${hostname}/api/index`).then(res=>{
            this.setState({
                links:res.data.links,
                msg:res.data.msg
            })
        })
    }


    render(){
        //const hostname='http://game-env.eba-9fppu8jx.us-east-2.elasticbeanstalk.com'
        const hostname='http://game-env.eba-9fppu8jx.us-east-2.elasticbeanstalk.com'
        return(
            //seems we have to define all routes here 
            //and user links in sub components
            <div>
                <Navbar/>
                <Router>           
                    <div>
                        <Route exact path='/user' render={(props) => <User  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game' render={(props) => <Game  hostname={hostname} {...props}/>}/>
                        <Route exact path='/' render={(props) => <Home  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/login' render={(props) => <Login  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/logout' render={(props) => <Logout  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/profile' render={(props) => <Profile  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/register' render={(props) => <Register  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/forgot_password' render={(props) => <ForgotPassword  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/reset_password/:reset_token' render={(props) => <ResetPassword  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/request_activate_account' render={(props) => <RequestActivateAccount  hostname={hostname} {...props}/>}/>
                        <Route exact path='/user/activate_account/:activate_token' render={(props) => <ActivateAccount  hostname={hostname} {...props}/>}/>




                        <Route exact path='/game/:game_title' render={(props) => <GamePosts  hostname={hostname} {...props}/>}/>

                        <Route exact path='/game/:game_title/:post_id' render={(props) => <Post  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/post/new_post' render={(props) => <NewPost  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/delete' render={(props) => <DeletePost  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/update' render={(props) => <UpdatePost  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/action/follow' render={(props) => <Follow  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/action/unfollow' render={(props) => <Unfollow  hostname={hostname} {...props}/>}/>

                        <Route exact path='/game/:game_title/:post_id/:comment_id/create_response' render={(props) => <CreateResponse  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_parent_id/:comment_id/update_response' render={(props) => <UpdateResponse  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_parent_id/:comment_id/delete_response' render={(props) => <DeleteResponse  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_id/update_comment' render={(props) => <UpdateComment  hostname={hostname} {...props}/>}/>
                        <Route exact path='/game/:game_title/:post_id/:comment_id/delete_comment' render={(props) => <DeleteComment  hostname={hostname} {...props}/>}/>
                        
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
  