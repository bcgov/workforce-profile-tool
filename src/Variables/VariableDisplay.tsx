import React from 'react'

import './VariableDisplay.scss'
import { VariableGroup } from './VariableGroup'
import VariableItemDisplay from './VariableItemDisplay'

interface Props {
  variableGroup: VariableGroup
  useShortDisplay?: boolean
}

const VariableDisplay = ({
  useShortDisplay,
  variableGroup,
}: Props): JSX.Element => {
  const options = variableGroup.selectableVariables.map((variable) => (
    <VariableItemDisplay
      key={variable.key}
      variable={variable}
      useShortDisplay={useShortDisplay}
      variableGroup={variableGroup}
    />
  ))

  return (
    <div className="VariableDisplay">
      <h3>{variableGroup.display}</h3>
      <ul>{options}</ul>
    </div>
  )
}

export default VariableDisplay
