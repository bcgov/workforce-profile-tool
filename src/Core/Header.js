import React, { Component } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div className='Header row'>
        <div className='col'>
          <Link to={'/'}><h1>Workforce Profiles 2018</h1></Link>
        </div>
      </div>
    )
  }
}

export default Header
