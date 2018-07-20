import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry, activeEmployeeType } from '../Services/activeVariables'

class Hiring extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — Hiring, 2015 to 2018'
    const filters = qs.parse(this.props.location.search)
    const ministry = activeMinistry(filters.Ministry_Key)
    const employeeType = activeEmployeeType(filters.Employee_Type)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{ministry} — {employeeType} Employees</h2>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <HiringGraph data={this.props.data} title={title} />
            <HiringTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Hiring)
