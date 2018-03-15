import React, { Component } from 'react'
import '../bootstrap/bootstrap.css'
import './Header.css'

class Header extends Component {
  render () {
    return (
      <div className='Header row'>
        <div className='col'>
          <h1>Workforce Profiles</h1>
        </div>
      </div>
    )
  }
}

export default Header
