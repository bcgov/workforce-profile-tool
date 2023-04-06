import { useEffect } from 'react'

import { ComparisonRawData, MinistryRawData } from '../@types/DataTypes'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import { useDataManager, variableGroupByKey } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import GenericView from './GenericView'
import OrganizationGraph from '../Graphs/OrganizationGraph'

export const buildMinistryData = (
  comparisonData: ComparisonRawData[] | undefined
): MinistryRawData[] => {
  if (!comparisonData) return []

  const data = comparisonData.map((d) => ({
    Des_Grp: d.Des_Grp,
    Ministry_Key: d.Ministry_Key,
    Value: `${d.Employees_BCPS}`,
  }))

  const bcPops = comparisonData.filter((d) => d.Ministry_Key === 'BCPS')

  variableGroupByKey('Des_Grp').variables.forEach((variable) => {
    data.push({
      Des_Grp: variable.key,
      Ministry_Key: 'BC Population',
      Value:
        bcPops.find((d) => d.Des_Grp === variable.key)
          ?.Employees_BC_Population || '',
    })
  })

  return data
}

const Organization = (): JSX.Element => {
  const { setLockedVars } = useDataManager()

  useEffect(() => setLockedVars({ Ministry_Key: ['BCPS'] }), [])

  const {
    data: unprocessedData,
    dataDictionary,
    isLoading,
    error,
  } = useDataQuery<ComparisonRawData>(DataKeyEnum.Comparison, true)

  const data = buildMinistryData(unprocessedData)

  console.log('DATA', data)

  return (
    <GenericView data={data} error={error} isLoading={isLoading}>
      <OrganizationGraph data={data} dataDictionary={dataDictionary} />
    </GenericView>
  )
}

export default Organization
