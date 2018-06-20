import React, { Component } from 'react'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'
import Loading from './Loading'

class Progress extends Component {
  render () {
    const title = 'Indicators of Progress — By Designated Group'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <ProgressGraph data={this.props.data} title={title} />
            <ProgressTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Progress
