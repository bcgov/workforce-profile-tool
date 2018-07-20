import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'

class Region extends Component {
  setVariableLock () {
    const filters = qs.parse(this.props.location.search)
    // console.log('filters.Ministry_Key', filters.Ministry_Key, (filters.Ministry_Key !== 'BCPS'))
    if (filters.Ministry_Key !== 'BCPS') {
      this.props.variableLockCallback({
        Employee_Type: 'REG'
      })
    } else {
      this.props.variableLockCallback(false)
    }
  }

  componentDidMount () {
    this.setVariableLock()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setVariableLock()
    }
  }

  render () {
    const title = 'Representation — Region'
    return (
      <div>
        <Title title={title} />
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
