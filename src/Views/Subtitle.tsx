import React from 'react'

import { displayNameByKey, useDataManager } from '../Data/DataManager'

const Subtitle = (): JSX.Element => {
  const { queryValues, employeeCount } = useDataManager()

  const displayMinistry = displayNameByKey(
    'Ministry_Key',
    queryValues.Ministry_Key
  )
  const displayEmployeeType = displayNameByKey(
    'Employee_Type',
    queryValues.Employee_Type
  )
  let subtitle = ''
  if (displayMinistry) {
    subtitle += `${displayMinistry}, ${displayEmployeeType.toLowerCase()} employees`
  }
  if (employeeCount) {
    subtitle += ` (n = ${employeeCount.toLocaleString()})`
  }

  return <h2 className="Subtitle">{subtitle}</h2>
}

export default Subtitle
