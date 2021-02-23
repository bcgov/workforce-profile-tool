import React from 'react'
import { useDataManager } from '../Data/DataManager'

const EmployeeCount = (): JSX.Element => {
  const { employeeCount } = useDataManager()

  return (
    <span className="EmployeeCount">
      (n = {employeeCount !== undefined ? employeeCount.toLocaleString() : ''})
    </span>
  )
}

export default EmployeeCount
