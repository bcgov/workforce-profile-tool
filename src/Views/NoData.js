import React, { Component } from 'react'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class Loading extends Component {
  render () {
    let groupNames = VARIABLE_MANAGER.variableGroups.map(g => g.display)
    groupNames[groupNames.length - 1] = `or ${groupNames[groupNames.length - 1]}`
    groupNames = groupNames.join(', ')
    return (
      <div className='alert alert-warning' role='alert'>
        <h2>No data</h2>
        <p>There is no data for the selected combination of filters. Try
          changing the selected {groupNames}.
        </p>
      </div>
    )
  }
}

export default Loading
