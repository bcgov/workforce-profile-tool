import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeEmployeeType, activeMinistry } from '../Services/activeVariables'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import { ArrayParam, StringParam, useQueryParams } from 'use-query-params'

export const subtitle = (
  queryValues: FixTypeLater,
  ministry: FixTypeLater,
  employeeType?: FixTypeLater,
  employeeCount?: number
): string => {
  const displayMinistry = ministry || activeMinistry(queryValues.Ministry_Key)
  const displayEmployeeType =
    employeeType || activeEmployeeType(queryValues.Employee_Type) || ''
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
  const { employeeCount } = useDataManager()
  const [queryValues] = useQueryParams({
    Employee_Type: StringParam,
    Des_Grp: ArrayParam,
    Ministry_Key: StringParam,
  })

  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle(queryValues, null, null, employeeCount)}</h2>
    </div>
  )
}

export default Title
