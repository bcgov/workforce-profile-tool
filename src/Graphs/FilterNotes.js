import React, { Component } from 'react'
import { withRouter } from 'react-router'

import qs from '../Services/query-string'
import {
  VARIABLE_MANAGER,
  fromActiveVariableArray,
  activeVariablesToDisplay
} from '../Variables/VariableManager'

class FilterNotes extends Component {
  render () {
    const activeVariables = VARIABLE_MANAGER.emptySelectableVariableMap()
    fromActiveVariableArray(activeVariables, qs.parse(this.props.location.search))
    const displayVariables = activeVariablesToDisplay(activeVariables)

    const filters = displayVariables.map(varGroup => {
      const optionNames = varGroup.optionNames.map((optionName, i, a) => {
        const comma = i < a.length - 1 ? ', ' : ''
        return (<span key={optionName}>{optionName}{comma}</span>)
      })
      return (<p key={varGroup.name}><strong>{varGroup.name}</strong>: {optionNames}</p>)
    })

    return (
      <div className='FilterNotes'>
        <h1>Active Filters</h1>
        {filters}
      </div>
    )
  }
}

export default withRouter(FilterNotes)
