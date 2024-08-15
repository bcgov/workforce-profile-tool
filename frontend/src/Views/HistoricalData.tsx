import { VARIABLE_MAP, useDataManager } from '../Data/DataManager'

const HistoricalData = (): JSX.Element => {
  const { year } = useDataManager()

  if (year === VARIABLE_MAP['Year'].variables.slice(-1).pop()?.key) {
    return <></>
  }

  return (
    <div className="alert alert-warning Shadow" role="alert">
      <h2>Historical data</h2>
      <p>You are currently viewing data from {year}.</p>
      <p>Caution is advised when comparing the current report to historical reports.</p>
    </div>
  )
}

export default HistoricalData
