import { withRouter } from 'react-router-dom'
import React from 'react'

import { VARIABLES } from './VariableManager'
import VariableDisplay from './VariableDisplay'

import './VariableList.scss'
import { VariableGroup } from './VariableGroup'

const VariableList = (): JSX.Element => {
  const variables = VARIABLES.variableGroups.map((group: VariableGroup) => (
    <VariableDisplay key={group.key} variableGroup={group} />
  ))

  return (
    <div className="VariableList row">
      <div className="col">{variables}</div>
    </div>
  )
}

export default withRouter(VariableList)
