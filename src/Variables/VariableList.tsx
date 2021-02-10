import { withRouter } from 'react-router-dom'
import React from 'react'

import { VARIABLE_MANAGER } from './VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import VariableDisplay from './VariableDisplay'

import './VariableList.scss'

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
