import React, { Component } from 'react'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'
import Loading from './Loading'

class Progress extends Component {
  render () {
    return (
      <div>
        <h1>Indicators of Progress — By Designated Group</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <ProgressGraph data={this.props.data} />
            <ProgressTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Progress
