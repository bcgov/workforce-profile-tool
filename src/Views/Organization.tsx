import { useDataManager } from '../Data/DataManager'
import React, { useEffect } from 'react'

import GenericView from './GenericView'
import OrganizationGraph from '../Graphs/OrganizationGraph'

const Organization = (): JSX.Element => {
  const { ministryData: data, setLockedVars } = useDataManager()

  useEffect(() => setLockedVars({ Ministry_Key: ['BCPS'] }), [])

  return (
    <GenericView data={data}>
      <h1>Organizations</h1>
      <OrganizationGraph title={'Organizations'} />
    </GenericView>
  )
}

export default Organization
