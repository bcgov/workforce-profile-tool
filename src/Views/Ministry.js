import React, { Component } from 'react'
import MinistryGraph from '../Graphs/MinistryGraph'
import Loading from './Loading'

class Ministry extends Component {
  render () {
    return (
      <div>
        <h1>Ministries</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <MinistryGraph data={this.props.data} />
            {/* <MinistryTable data={this.props.data} /> */}
            </div>
        }
      </div>
    )
  }
}

export default Ministry
