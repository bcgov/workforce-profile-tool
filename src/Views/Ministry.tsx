import React from 'react'

import MinistryGraph from '../Graphs/MinistryGraph'

// TODO: lock variables: REG and BCPS

const Ministry = (): JSX.Element => {
  const title = 'Ministries'

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <MinistryGraph title={title} />
      </div>
    </div>
  )
}

export default Ministry
