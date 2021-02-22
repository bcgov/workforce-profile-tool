import React from 'react'
import FixTypeLater from '../@types/FixTypeLater'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'

const NoData = (): JSX.Element => {
  let groupNames: FixTypeLater = VARIABLE_MANAGER.variableGroups.map(
    (g) => g.display
  )
  groupNames[groupNames.length - 1] = `or ${groupNames[groupNames.length - 1]}`
  groupNames = groupNames.join(', ')
  return (
    <div className="alert alert-warning" role="alert">
      <h2>No data</h2>
      <p>
        There is no data for the selected combination of filters. Try changing
        the selected {groupNames}.
      </p>
    </div>
  )
}

export default NoData
