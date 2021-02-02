import React, { Component } from 'react'
import FixTypeLater from '../@types/FixTypeLater'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

interface Props {
  data: FixTypeLater[]
  variableLockCallback: FixTypeLater
  employeeCount: FixTypeLater
}

class Hiring extends Component<Props> {
  componentDidMount(): void {
    this.props.variableLockCallback(false)
  }

  render(): JSX.Element {
    const title = 'Indicators of Progress — Hiring, 2015 to 2018'
    return (
      <div>
        <Title title={title} employeeCount={this.props.employeeCount} />
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 && (
          <div>
            <HiringGraph data={this.props.data} title={title} />
            <HiringTable data={this.props.data} />
          </div>
        )}
      </div>
    )
  }
}

export default Hiring
