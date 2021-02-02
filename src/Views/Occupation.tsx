import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import FixTypeLater from '../@types/FixTypeLater'

interface Props extends RouteComponentProps {
  data: FixTypeLater[]
  variableLockCallback: FixTypeLater
  employeeCount: FixTypeLater
}

class Occupation extends Component<Props> {
  setVariableLock() {
    const filters = qs.parse(this.props.location.search)
    // console.log('filters.Ministry_Key', filters.Ministry_Key, (filters.Ministry_Key !== 'BCPS'))
    if (filters.Ministry_Key !== 'BCPS') {
      this.props.variableLockCallback({
        Employee_Type: 'REG',
      })
    } else {
      this.props.variableLockCallback(false)
    }
  }

  componentDidMount() {
    this.setVariableLock()
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setVariableLock()
    }
  }

  render(): JSX.Element {
    const title = 'Representation — Occupation'
    return (
      <div>
        <Title title={title} employeeCount={this.props.employeeCount} />
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 && (
          <div>
            <OccupationGraph data={this.props.data} title={title} />
            <OccupationTable data={this.props.data} />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Occupation)
