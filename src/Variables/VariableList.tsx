import React from 'react'

import { VariableGroup } from './VariableGroup'
import { VARIABLES } from './VariableManager'
import VariableDisplay from './VariableDisplay'

import './VariableList.scss'

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

export default VariableList
