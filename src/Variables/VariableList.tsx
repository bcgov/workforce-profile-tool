import React from 'react'

import { VARIABLE_MAP } from '../Data/DataManager'
import VariableDisplay from './VariableDisplay'

import './VariableList.scss'

const VariableList = (): JSX.Element => {
  const variables = Object.values(VARIABLE_MAP).map((group) => (
    <VariableDisplay key={group.key} variableGroup={group} />
  ))

  return (
    <div className="VariableList row">
      <div className="col">{variables}</div>
    </div>
  )
}

export default VariableList
