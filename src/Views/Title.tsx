import React from 'react'

import { displayNameByKey, useDataManager } from '../Data/DataManager'
import FixTypeLater from '../@types/FixTypeLater'

export const subtitle = (
  queryValues: FixTypeLater,
  employeeCount?: number
): string => {
  const displayMinistry = displayNameByKey(
    'Ministry_Key',
    queryValues.Ministry_Key
  )
  const displayEmployeeType = displayNameByKey(
    'Employee_Type',
    queryValues.Employee_Type
  )
  let title = `${displayMinistry}, ${displayEmployeeType.toLowerCase()} employees`
  if (employeeCount) {
    title += ` (n = ${employeeCount.toLocaleString()})`
  }
  return title
}

interface Props {
  title: string
}

const Title = ({ title }: Props): JSX.Element => {
  const { employeeCount, queryValues } = useDataManager()

  console.log('queryValues', queryValues)

  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle(queryValues, employeeCount)}</h2>
    </div>
  )
}

export default Title
