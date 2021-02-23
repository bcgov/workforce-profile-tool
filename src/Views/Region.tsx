import React from 'react'

import { useDataManager } from '../Data/DataManager'
import Loading from './Loading'
import GenericView from './GenericView'
import Dictionary from '../@types/Dictionary'
import { VARIABLES } from '../Variables/VariableManager'
import RegionSubtable from '../Table/RegionSubtable'

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const Region = (): JSX.Element => {
  const { occupationRegionData: data } = useDataManager()

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
    <GenericView title={''} data={data}>
      {tables}
    </GenericView>
  )
}

export default Region
