import React, { Component } from 'react'
import { isVariableActive } from './VariableManager'
import './VariableDisplay.scss'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  variableGroup: FixTypeLater
  useShortDisplay?: boolean
}

const VariableDisplay = ({
  useShortDisplay,
  variableGroup,
}: Props): JSX.Element => {
  const options = variableGroup.selectableVariables.map(
    (variable: FixTypeLater) => {
      const variableGroupKey = variableGroup.key
      const variableKey = variable.key
      const isActive = true // TODO: fix this
      const isLocked = false // TODO: fix this
      return (
        <li
          key={variable.key}
          className={`${isActive ? ' active' : ''} ${
            isLocked ? ' locked' : ''
          }`}
          onClick={() => {
            console.log('Toggle') // TODO: fix this
          }}
        >
          {useShortDisplay ? variable.shortDisplay : variable.display}
        </li>
      )
    }
  )

  return (
    <div className="VariableDisplay">
      <h3>{variableGroup.display}</h3>
      <ul>{options}</ul>
    </div>
  )
}

export default VariableDisplay
