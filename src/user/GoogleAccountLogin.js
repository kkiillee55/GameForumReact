import  {React, Component } from 'react'
import {GoogleLogin} from 'react-google-login'
import Axios from 'axios'
import Cookies from 'js-cookie'

export default class GoogleAccountLogin extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            first_name:'',
            last_name:'',
            error:''
        }

        this.onSuccess=this.onSuccess.bind(this)
        this.onFailure=this.onFailure.bind(this)
        this.refreshTokenSetup=this.refreshTokenSetup.bind(this)
    }

    refreshTokenSetup=(response)=>{
        let refreshTiming=(response.tokenObj.expires_in || 3600-5*60)*1000
        console.log('refreshtiming: ',refreshTiming)

        const refreshToken=async()=>{
            console.log('refreshtiming: ',refreshTiming)
            const newAuthRes=await response.reloadAuthResponse()
            refreshTiming=(newAuthRes.expires_in ||3600-5*60)*1000
            console.log('newAuthRes: ',newAuthRes)
            console.log('new auth token',newAuthRes.id_token)
            
            const flask_response=await Axios.post('http://127.0.0.1:5000/api/user/google_login',{
                email:this.state.email,
                first_name:this.state.first_name,
                last_name:this.state.last_name
            })
            console.log('response from falsk: ',flask_response)
            Cookies.set('token',flask_response.data.token)
            Cookies.set('refresh_token',flask_response.data.refresh_token)
            setTimeout(refreshToken,refreshTiming)

        }

        setTimeout(refreshToken,refreshTiming)
    }



    onSuccess(response){
        console.log('Login Success: '+response.profileObj)
        console.log(response)
        console.log('Email: ',response.profileObj.email)
        console.log('first_name: ',response.profileObj.givenName)
        console.log('last_name: ',response.profileObj.familyName)
        this.setState({
            email:response.profileObj.email,
            first_name:response.profileObj.givenName,
            last_name:response.profileObj.familyName,
        })
        Axios.post('http://127.0.0.1:5000/api/user/google_login',{
                email:this.state.email,
                first_name:this.state.first_name,
                last_name:this.state.last_name
        }).then(response=>{
            Cookies.set('token',response.data.token)
            Cookies.set('refresh_token',response.data.refresh_token)
        })
        // this.refreshTokenSetup(response)
        this.props.hist.push('/')
    }
    

    onFailure(response){
        console.log('Login Failed: ',response)
    }


    render() {
        const clientId='243060441327-51tqelje6aub0eptnj54v7pkk5t4nos9.apps.googleusercontent.com'
        return (
            <div>
                {/* <h1>this is google login page</h1>
                <h1>Save email, first_name,last_name</h1>
                <h1>if email exists in our database, login this user directly, maybe need to add a new api for direct login in flask </h1>
                <h1>if email dose not in database,  save it and set a random password, send email to tell this user he's registered using gmail and contains random password</h1>
                <h1> the defautl address is Earth</h1> */}
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Login'
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{marginTop:'100px'}}
                    isSignedIn={false}
                />       
            </div>
        )
    }
}

// const clientId='243060441327-51tqelje6aub0eptnj54v7pkk5t4nos9.apps.googleusercontent.com'
// export default function GoogleAccountLogin() {
    
    
//     const onSuccess=(res)=>{
        // console.log('Login Success: '+res.profileObj)
        // console.log(res)
        // console.log('Email: ',res.profileObj.email)
        // console.log('first_name: ',res.profileObj.givenName)
        // console.log('last_name: ',res.profileObj.familyName)
        
//     }
    
//     const onFailure=(res)=>{
//         console.log('Login Failed: ',res)
//     }
    
//     return (
//         <div>
            // <h1>this is google login page</h1>
            // <h1>Save email, first_name,last_name</h1>
            // <h1>if email exists in our database, login this user directly, maybe need to add a new api for direct login in flask </h1>
            // <h1>if email dose not in database,  save it and set a random password, send email to tell this user he's registered using gmail and contains random password</h1>
            // <h1> the defautl address is Earth</h1>
            // <GoogleLogin
            //     clientId={clientId}
            //     buttonText='Login'
            //     onSuccess={onSuccess}
            //     onFailure={onFailure}
            //     cookiePolicy={'single_host_origin'}
            //     style={{marginTop:'100px'}}
            //     isSignedIn={true}
            // />
//         </div>
//     )
// }
