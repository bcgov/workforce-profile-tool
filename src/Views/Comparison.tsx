import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeVariables'
import FixTypeLater from '../@types/FixTypeLater'

interface Props extends RouteComponentProps {
  data: FixTypeLater[]
  location: FixTypeLater
  employeeCount: FixTypeLater
  variableLockCallback: FixTypeLater
}

class Comparison extends Component<Props> {
  componentDidMount() {
    this.props.variableLockCallback(false)
  }

  render(): JSX.Element {
    const title = 'Comparison with Provincial Workforce'
    const filters = qs.parse(this.props.location.search)
    const ministry = activeMinistry(filters.Ministry_Key)
    return (
      <div>
        <Title
          title={'Comparison with Provincial Workforce'}
          employeeCount={this.props.employeeCount}
        />
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 && (
          <div>
            <ComparisonGraph
              data={this.props.data}
              title={title}
              ministry={ministry}
            />
            <ComparisonTable data={this.props.data} ministry={ministry} />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Comparison)
