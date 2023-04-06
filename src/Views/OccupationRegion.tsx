import { useEffect } from 'react'

import { DataKeyEnum } from '../@types/DataKeyEnum'
import { displayNameByKey } from '../Data/DataManager'
import { OccupationRegionRawData } from '../@types/DataTypes'
import { shortDisplayNameByKey, useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import Dictionary from '../@types/Dictionary'
import GenericView from './GenericView'
import OccupationGraph from '../Graphs/OccupationRegionGraph'
import OccupationRegionSubtable from '../Table/OccupationRegionSubtable'

export enum OccupationRegionEnum {
  Region = 'Region',
  Occupation = 'Occupation',
}

interface Props {
  viewType: OccupationRegionEnum
}

const OccupationRegion = ({ viewType }: Props): JSX.Element => {
  const { setLockedVars, year, queryValues } = useDataManager()

  useEffect(() => {
    const employeeType = year === '2018' ? ['REG'] : ['ALL']

    const varsToLock: Dictionary<string[]> =
      queryValues.Ministry_Key === 'BCPS' ? {} : { Employee_Type: employeeType }
    setLockedVars(varsToLock)
  }, [queryValues.Ministry_Key, year])

  const { isLoading, error, data, dataDictionary } =
    useDataQuery<OccupationRegionRawData>(DataKeyEnum.OccupationRegion)

  // Split the data
  const dataMap: Dictionary<OccupationRegionRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const tables = Object.keys(dataMap).map((k) => {
    const title = displayNameByKey('Des_Grp', k)
    const shortTitle = shortDisplayNameByKey('Des_Grp', k)
    return (
      <div key={k} className="mb-5">
        <h2 className="mb-0">{title}</h2>
        <OccupationRegionSubtable
          data={dataMap[k]}
          dataDictionary={dataDictionary}
          shortTitle={shortTitle}
          viewType={viewType}
          year={year}
          designatedGroupKey={k}
        />
      </div>
    )
  })

  return (
    <GenericView
      title={`Representation — ${viewType}`}
      data={data}
      isLoading={isLoading}
      error={error}
    >
      <OccupationGraph
        data={data}
        dataDictionary={dataDictionary}
        title={`Representation – ${viewType}`}
        organization={queryValues.Ministry_Key}
      />
      {tables}
    </GenericView>
  )
}

export default OccupationRegion
