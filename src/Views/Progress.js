import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry, activeEmployeeType } from '../Services/activeVariables'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

import Loading from './Loading'
import NoData from './NoData'

class Progress extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — By Designated Group'
    const filters = qs.parse(this.props.location.search)
    const ministry = activeMinistry(filters.Ministry_Key)
    const employeeType = activeEmployeeType(filters.Employee_Type)

    const codeOrder = {
      'IND': 0,
      'DIS': 1,
      'VM': 2,
      'WOM': 3,
      'WOM_SM': 4,
      'AS_TOTAL': 5
    }

    const data = this.props.data
    if (data && data.length) {
      data.sort((a, b) => {
        return codeOrder[a.Des_Grp] - codeOrder[b.Des_Grp]
      })
    }

    return (
      <div>
        <h1>{title}</h1>
        <h2>{ministry} — {employeeType} Employees</h2>
        {!data && <Loading />}
        {data && data.length === 0 && <NoData />}
        {data && data.length > 0 &&
          <div>
            <ProgressGraph data={data} title={title} />
            <ProgressTable data={data} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Progress)
