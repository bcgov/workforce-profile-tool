import React from 'react'

import MinistryGraph from '../Graphs/MinistryGraph'

// TODO: lock variables: REG and BCPS

const Ministry = (): JSX.Element => {
  const title = 'Ministries'
  const employeeCount = 1000 // useQueryParams

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <MinistryGraph title={title} employeeCount={employeeCount} />
      </div>
    </div>
  )
}

export default Ministry
