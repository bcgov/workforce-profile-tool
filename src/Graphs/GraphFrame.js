import React, { Component } from 'react'

import './Graphs.css'

class GraphFrame extends Component {
  render () {
    return (
      <div className={`GraphFrame row${this.props.className ? ` ${this.props.className}` : ''}`}>
        <div className='col-9'>
          {this.props.graph}
        </div>
        <div className='col-3'>
          {/* <FilterCount filterCount={this.props.filterCount} /> */}
          {this.props.legend}
        </div>
      </div>
    )
  }
}

export default GraphFrame
