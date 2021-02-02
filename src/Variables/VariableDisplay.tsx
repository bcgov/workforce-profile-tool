import React, { Component } from 'react'
import { isVariableActive } from './VariableManager'
import './VariableDisplay.scss'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  activeVariables: FixTypeLater
  lockVariables: FixTypeLater
  updateCallback: FixTypeLater
  useShortDisplay?: FixTypeLater
  variableGroup: FixTypeLater
}

class VariableDisplay extends Component<Props> {
  render(): JSX.Element {
    const options = this.props.variableGroup.selectableVariables.map(
      (variable: FixTypeLater) => {
        const variableGroupKey = this.props.variableGroup.key
        const variableKey = variable.key
        const isActive = isVariableActive(
          this.props.activeVariables,
          variableGroupKey,
          variableKey
        )
        const isLocked = this.props.lockVariables
        // console.log('isLocked', isLocked)
        return (
          <li
            key={variable.key}
            className={`${isActive ? ' active' : ''} ${
              isLocked ? ' locked' : ''
            }`}
            onClick={() => {
              if (!isLocked)
                this.props.updateCallback(this.props.variableGroup, variable)
            }}
          >
            {this.props.useShortDisplay
              ? variable.shortDisplay
              : variable.display}
          </li>
        )
      }
    )

    return (
      <div className="VariableDisplay">
        <h3>{this.props.variableGroup.display}</h3>
        <ul>{options}</ul>
      </div>
    )
  }
}

export default VariableDisplay
