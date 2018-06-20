import React, { Component } from 'react'
import MinistryGraph from '../Graphs/MinistryGraph'
import Loading from './Loading'

class Ministry extends Component {
  render () {
    const title = 'Ministries'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <MinistryGraph data={this.props.data} title={title} />
          </div>
        }
      </div>
    )
  }
}

export default Ministry
