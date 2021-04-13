import React from 'react'

import VariableDisplay from './VariableDisplay'

import './VariableList.scss'
import { VARIABLE_MAP } from '../Data/DataManager'

const VariableList = (): JSX.Element => {
  const variables = Object.values(VARIABLE_MAP).map((group) => (
    <VariableDisplay key={group.key} variableGroup={group} />
  ))

  console.log('variables', variables)

  return (
    <div className="VariableList row">
      <div className="col">{variables}</div>
    </div>
  )
}

export default VariableList
