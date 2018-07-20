import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry, activeEmployeeType } from '../Services/activeVariables'

class Region extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Representation — Region'
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
            <RegionGraph data={this.props.data} title={title} />
            <RegionTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Region)
