import React, { Component } from 'react'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class Progress extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — By Designated Group'

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
        <Title title={title} employeeCount={this.props.employeeCount} />
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

export default Progress
