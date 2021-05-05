import { Link, useLocation } from 'react-router-dom'
import React from 'react'

import './Header.scss'
import logo from './bc-stats-logo.png'

interface Props {
  showList: boolean
  toggleListCallback: () => void
}

const Header = ({ showList, toggleListCallback }: Props): JSX.Element => {
  const location = useLocation()

  return (
    <div className="Header row">
      <div className="col mb-0 mb-sm-4">
        <div className="row align-items-center">
          <div className="col-6 order-2 order-sm-1 col-sm-12">
            <Link to={`/${location.search}`}>
              <img src={logo} style={{ maxWidth: '100%' }} />
            </Link>
          </div>
          <div className="col-6 order-1 order-sm-2 col-sm-12">
            <Link to={`/${location.search}`}>
              <h1 className="my-2">Workforce Profiles</h1>
            </Link>
            <button
              className="btn btn-primary btn-sm my-2 d-sm-none"
              onClick={toggleListCallback}
            >
              {showList ? 'Hide' : 'Show'} variables{' '}
              <i
                className={`fas fa-caret-${showList ? 'down' : 'right'} ml-2`}
                style={{ marginRight: '0px' }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
