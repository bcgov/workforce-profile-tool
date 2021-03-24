import { useDataManager } from '../Data/DataManager'
import React, { useEffect } from 'react'

import GenericView from './GenericView'
import MinistryGraph from '../Graphs/MinistryGraph'

const Ministry = (): JSX.Element => {
  const { ministryData: data, setLockedVars } = useDataManager()

  useEffect(
    () => setLockedVars({ Employee_Type: ['REG'], Ministry_Key: ['BCPS'] }),
    []
  )

  console.log('data', data)

  return (
    <GenericView data={data}>
      <MinistryGraph title={'Ministries'} />
    </GenericView>
  )
}

export default Ministry
