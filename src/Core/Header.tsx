import { Link } from 'react-router-dom'
import React from 'react'

import './Header.scss'
import logo from './bc-stats-logo.png'

const Header = (): JSX.Element => {
  return (
    <div className="Header row">
      <div className="col mb-0 mb-sm-4">
        <Link to={'/'}>
          <div className="row align-items-center">
            <div className="col-6 order-2 order-sm-1 col-sm-12">
              <img src={logo} style={{ maxWidth: '100%' }} />
            </div>
            <div className="col-6 order-1 order-sm-2 col-sm-12">
              <h1>Workforce Profiles</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
