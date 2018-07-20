import React, { Component } from 'react'
import MinistryGraph from '../Graphs/MinistryGraph'
import Loading from './Loading'
import NoData from './NoData'

class Ministry extends Component {
  componentDidMount () {
    this.props.variableLockCallback(
      true,
      { Employee_Type: 'REG', Ministry_Key: 'BCPS' }
    )
  }

  render () {
    const title = 'Ministries'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <MinistryGraph data={this.props.data} title={title} />
          </div>
        }
      </div>
    )
  }
}

export default Ministry
