import { useDataManager } from '../Data/DataManager'
import React, { useEffect } from 'react'

import GenericView from './GenericView'
import MinistryGraph from '../Graphs/MinistryGraph'
import Title from './Title'

const Ministry = (): JSX.Element => {
  const { ministryData: data, setLockedVars } = useDataManager()

  useEffect(() => setLockedVars({ Ministry_Key: ['BCPS'] }), [])

  console.log('data', data)

  return (
    <GenericView data={data}>
      <h1>Ministries</h1>
      <MinistryGraph title={'Ministries'} />
    </GenericView>
  )
}

export default Ministry
