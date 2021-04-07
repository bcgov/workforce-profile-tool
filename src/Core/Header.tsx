import { Link } from 'react-router-dom'
import React from 'react'

import './Header.scss'
import logo from './bc-stats-logo.png'

const Header = (): JSX.Element => {
  return (
    <div className="Header row">
      <div className="col mb-4">
        <Link to={'/'}>
          <img src={logo} style={{ maxWidth: '100%' }} />
          <br />
          <h1>Workforce Profiles</h1>
        </Link>
      </div>
    </div>
  )
}

export default Header
