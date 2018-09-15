import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry, activeEmployeeType } from '../Services/activeVariables'

export const subtitle = (locationSearch, ministry, employeeType, employeeCount = null) => {
  const filters = qs.parse(locationSearch)
  const displayMinistry = ministry || activeMinistry(filters.Ministry_Key)
  const displayEmployeeType = employeeType || activeEmployeeType(filters.Employee_Type)
  let title = `${displayMinistry}, ${displayEmployeeType.toLowerCase()} employees`
  if (employeeCount) { title += (` (n = ${employeeCount.toLocaleString()})`) }
  return title
}

class Title extends Component {
  render () {
    const title = this.props.title
    return (
      <div>
        <h1>{title}</h1>
        <h2>{subtitle(this.props.location.search, null, null, this.props.employeeCount)}</h2>
      </div>
    )
  }
}

export default withRouter(Title)
