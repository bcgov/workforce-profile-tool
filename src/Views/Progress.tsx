import React, { Component } from 'react'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

interface Props {
  data: FixTypeLater[]
  variableLockCallback: FixTypeLater
  employeeCount: FixTypeLater
}

class Progress extends Component<Props> {
  componentDidMount(): void {
    this.props.variableLockCallback(false)
  }

  render(): JSX.Element {
    const title = 'Indicators of Progress — By Designated Group'

    const codeOrder: Dictionary = {
      IND: 0,
      DIS: 1,
      VM: 2,
      WOM: 3,
      WOM_SM: 4,
      AS_TOTAL: 5,
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
        {data && data.length > 0 && (
          <div>
            <ProgressGraph data={data} title={title} />
            <ProgressTable data={data} />
          </div>
        )}
      </div>
    )
  }
}

export default Progress
