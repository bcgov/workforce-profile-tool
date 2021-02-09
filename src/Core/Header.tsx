import { Link } from 'react-router-dom'
import React from 'react'

import './Header.scss'

const Header = (): JSX.Element => {
  return (
    <div className="Header row">
      <div className="col">
        <Link to={'/'}>
          <h1>Workforce Profiles</h1>
        </Link>
      </div>
    </div>
  )
}

export default Header
