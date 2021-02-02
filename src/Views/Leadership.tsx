import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  data: FixTypeLater[]
  variableLockCallback: FixTypeLater
}

class Leadership extends Component<Props> {
  componentDidMount(): void {
    this.props.variableLockCallback({
      Employee_Type: 'ALL',
      Ministry_Key: 'BCPS',
    })
  }

  render(): JSX.Element {
    const title = 'Leadership by Type'
    return (
      <div>
        <Title title={title} />
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 && (
          <div>
            <LeadershipGraph data={this.props.data} title={title} />
            <LeadershipTable data={this.props.data} />
          </div>
        )}
      </div>
    )
  }
}

export default Leadership
