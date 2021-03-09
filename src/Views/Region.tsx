import React, { useEffect } from 'react'

import { useDataManager } from '../Data/DataManager'
import Loading from './Loading'
import GenericView from './GenericView'
import Dictionary from '../@types/Dictionary'
import { VARIABLES } from '../Variables/VariableManager'
import RegionSubtable from '../Table/RegionSubtable'
import OccupationGraph from '../Graphs/OccupationGraph'
import { ArrayParam, useQueryParam } from 'use-query-params'

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const Region = (): JSX.Element => {
  const { occupationRegionData: data, setLockedVars } = useDataManager()

  const [ministryQueryVars] = useQueryParam('Ministry_Key', ArrayParam)

  useEffect(() => {
    const varsToLock: Dictionary<string[]> = ministryQueryVars?.includes('BCPS')
      ? {}
      : { Employee_Type: ['REG'] }
    setLockedVars(varsToLock)
  }, [ministryQueryVars])

  if (!data) return <Loading />

  // Split the data
  const dataMap: Dictionary<any> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const tables = Object.keys(dataMap).map((k) => {
    const title = VARIABLES.displayNameByKey('Des_Grp', k)
    const shortTitle = VARIABLES.shortDisplayNameByKey('Des_Grp', k)
    return (
      <div key={k}>
        <h2>{title}</h2>
        <RegionSubtable data={dataMap[k]} shortTitle={shortTitle} />
      </div>
    )
  })

  return (
    <GenericView title={'Representation — Region'} data={data}>
      <OccupationGraph title={'Representation – Region'} />
      {tables}
    </GenericView>
  )
}

export default Region
