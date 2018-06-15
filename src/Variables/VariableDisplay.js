import React, { Component } from 'react'
import { isVariableActive } from './VariableManager'
import './VariableDisplay.css'

class VariableDisplay extends Component {
  render () {
    const options = this.props.variableGroup.selectableVariables.map(variable => {
      const variableGroupKey = this.props.variableGroup.key
      const variableKey = variable.key
      const isActive = isVariableActive(this.props.activeVariables, variableGroupKey, variableKey)
      return (
        <li
          key={variable.key}
          className={isActive ? ' active' : ''}
          onClick={e => this.props.updateCallback(this.props.variableGroup, variable)}
        >
          {variable.display}
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
