import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import FixTypeLater from '../@types/FixTypeLater'

import qs from '../Helpers/query-string'
import {
  VARIABLES,
  activeVariablesToDisplay,
  fromActiveVariableArray,
} from '../Variables/VariableManager'

interface Props extends RouteComponentProps {
  location: FixTypeLater
}

class FilterNotes extends Component<Props> {
  render(): JSX.Element {
    const activeVariables = VARIABLES.emptySelectableVariableMap()
    fromActiveVariableArray(
      activeVariables,
      qs.parse(this.props.location.search) // TODO: remove this and use the react query string library instead
    )
    const displayVariables = activeVariablesToDisplay(activeVariables)

    const filters = displayVariables.map((varGroup: FixTypeLater) => {
      const optionNames = varGroup.optionNames.map(
        (optionName: FixTypeLater, i: FixTypeLater, a: FixTypeLater) => {
          const comma = i < a.length - 1 ? ', ' : ''
          return (
            <span key={optionName}>
              {optionName}
              {comma}
            </span>
          )
        }
      )
      return (
        <p key={varGroup.name}>
          <strong>{varGroup.name}</strong>: {optionNames}
        </p>
      )
    })

    return (
      <div className="FilterNotes">
        <h1>Active Filters</h1>
        {filters}
      </div>
    )
  }
}

export default withRouter(FilterNotes)
