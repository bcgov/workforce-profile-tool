import { VARIABLE_MAP, useDataManager } from '../Data/DataManager'
import { Link, useLocation } from 'react-router-dom'

const HistoricalData = (): JSX.Element => {
  const { year } = useDataManager()
  const location = useLocation()

  if (year === VARIABLE_MAP['Year'].variables.slice(-1).pop()?.key) {
    return <></>
  }

  return (
    <div className="alert alert-warning Shadow" role="alert">
      <h2>Historical data</h2>
      <p>You are currently viewing data from {year}. Caution is advised when comparing the current report to historical reports.
        For more information refer to the <Link to={`/${location.search}`}>Home Page</Link>, or contact us at <a href="mailto:work.environment.survey@gov.bc.ca">BC Stats</a>.
      </p>
    </div>
  )
}

export default HistoricalData
