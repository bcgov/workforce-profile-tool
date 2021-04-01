import { useDataManager } from '../Data/DataManager'
import React, { useEffect } from 'react'

import GenericView from './GenericView'
import MinistryGraph from '../Graphs/MinistryGraph'

const Ministry = (): JSX.Element => {
  const { ministryData: data, setLockedVars } = useDataManager()

  useEffect(() => setLockedVars({ Ministry_Key: ['BCPS'] }), [])

  return (
    <GenericView data={data}>
      <h1>Ministries</h1>
      <MinistryGraph title={'Ministries'} />
    </GenericView>
  )
}

export default Ministry
