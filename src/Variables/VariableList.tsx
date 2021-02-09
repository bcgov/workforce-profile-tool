import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './VariableList.scss'
import VariableDisplay from './VariableDisplay'
import FixTypeLater from '../@types/FixTypeLater'
import { VARIABLE_MANAGER } from './VariableManager'

const VariableList = (): JSX.Element => {
  const variables = VARIABLE_MANAGER.variableGroups.map(
    (group: FixTypeLater) => (
      <VariableDisplay key={group.key} variableGroup={group} />
    )
  )

  return (
    <div className="VariableList row">
      <div className="col">{variables}</div>
    </div>
  )
}

export default withRouter(VariableList)
