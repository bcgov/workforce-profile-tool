/* globals $ */

import React, { Component } from 'react'

class Tooltip extends Component {
  componentDidMount () {
    $(this.tooltip).tooltip()
  }

  render () {
    return (
      <span className='Tooltip'
        ref={tooltip => { this.tooltip = tooltip }}
        data-toggle='tooltip'
        title={`${this.props.text}`}
        data-placement='bottom'
        data-html='true'
      >
        <i className='fas fa-info-circle' />
      </span>
    )
  }
}

export default Tooltip
