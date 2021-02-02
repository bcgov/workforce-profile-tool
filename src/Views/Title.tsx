import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeEmployeeType, activeMinistry } from '../Services/activeVariables'
import FixTypeLater from '../@types/FixTypeLater'

export const subtitle = (
  locationSearch: FixTypeLater,
  ministry: FixTypeLater,
  employeeType?: FixTypeLater,
  employeeCount?: FixTypeLater
): string => {
  const filters = qs.parse(locationSearch)
  const displayMinistry = ministry || activeMinistry(filters.Ministry_Key)
  const displayEmployeeType =
    employeeType || activeEmployeeType(filters.Employee_Type)
  let title = `${displayMinistry}, ${displayEmployeeType.toLowerCase()} employees`
  if (employeeCount) {
    title += ` (n = ${employeeCount.toLocaleString()})`
  }
  return title
}

interface Props extends RouteComponentProps {
  title: string
  employeeCount?: FixTypeLater
}

class Title extends Component<Props> {
  render() {
    const title = this.props.title
    return (
      <div>
        <h1>{title}</h1>
        <h2>
          {subtitle(
            this.props.location.search,
            null,
            null,
            this.props.employeeCount
          )}
        </h2>
      </div>
    )
  }
}

export default withRouter(Title)
