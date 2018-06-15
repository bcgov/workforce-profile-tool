import React, { Component } from 'react'
import './VariableDisplay.css'

class VariableDisplay extends Component {
  render () {
    const options = this.props.variableGroup.selectableVariables.map(o => {
      return (
        <li
          key={o.key}
          className={o.active ? ' active' : ''}
          onClick={e => this.props.updateCallback(o)}
        >
          {o.display}
        </li>
      )
    })

    return (
      <div className='VariableDisplay'>
        <h3>{this.props.variableGroup.display}</h3>
        <ul>{options}</ul>
      </div>
    )
  }
}

export default VariableDisplay
