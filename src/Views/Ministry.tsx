import React, { useEffect } from 'react'
import { useDataManager } from '../Data/DataManager'

import MinistryGraph from '../Graphs/MinistryGraph'

// TODO: lock variables: REG and BCPS

const Ministry = (): JSX.Element => {
  const title = 'Ministries'

  const { setLockedVars } = useDataManager()

  useEffect(
    () => setLockedVars({ Employee_Type: ['REG'], Ministry_Key: ['BCPS'] }),
    []
  )

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
