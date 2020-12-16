import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <ul className='nav'>    
                    <li><a href='/'>Home</a></li>
                    <li><a href='/user'>User</a></li>
                    <li><a href='/game'>Game</a></li>
                </ul>
            </div>
        )
    }
}
