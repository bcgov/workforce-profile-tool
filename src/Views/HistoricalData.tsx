import React from 'react'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'

const HistoricalData = (): JSX.Element => {
  const { year } = useDataManager()

  if (
    year === VARIABLES.variableGroupByKey('Year').variables.slice(-1).pop()?.key
  ) {
    return <></>
  }

  return (
    <div className="alert alert-warning Shadow" role="alert">
      <h2>Historical data</h2>
      <p>You are currently viewing data from {year}.</p>
    </div>
  )
}

export default HistoricalData
