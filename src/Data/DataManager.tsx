import { filter } from 'd3'
import React, { ReactNode, createContext, useContext, useMemo } from 'react'
import {
  ArrayParam,
  StringParam,
  useQueryParam,
  useQueryParams,
} from 'use-query-params'

import {
  ComparisonRawData,
  GenericRawData,
  LeadershipRawData,
  MinistryRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'

type DataManagerContextType = {
  progressData?: ProgressRawData[]
  hiringTotal?: number
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
  comparisonData?: ComparisonRawData[]
}

const DataManagerContext = createContext<DataManagerContextType | undefined>(
  undefined
)

const filterData = <T extends GenericRawData>(
  data: T[] | undefined,
  queryValues: FixTypeLater // TODO: really fix this!
): T[] => {
  return data
    ? data
        .filter((d) =>
          d.Employee_Type ? d.Employee_Type === queryValues.Employee_Type : true
        )
        .filter((d) =>
          d.Des_Grp ? queryValues.Des_Grp.includes(d.Des_Grp) : true
        )
        .filter((d) =>
          d.Ministry_Key ? d.Ministry_Key === queryValues.Ministry_Key : true
        )
    : []
}

function useDataManager(): DataManagerContextType {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const { progressData, leadershipData, ministryData, comparisonData } = context

  const [queryValues] = useQueryParams({
    Employee_Type: StringParam,
    Des_Grp: ArrayParam,
    Ministry_Key: StringParam,
  })

  return {
    progressData: filterData(progressData, queryValues),
    hiringTotal: progressData?.find(
      (d) =>
        d.Employee_Type === queryValues.Employee_Type &&
        d.Des_Grp === 'AS_TOTAL' &&
        d.Ministry_Key === queryValues.Ministry_Key
    )?.['2018_hired_ct'],
    leadershipData,
    ministryData,
    comparisonData: filterData(comparisonData, queryValues),
  }
}

interface DataManagerProviderProps {
  children: ReactNode
  comparisonData?: ComparisonRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
  progressData?: ProgressRawData[]
}

function DataManagerProvider({
  children,
  comparisonData,
  progressData,
  leadershipData,
  ministryData,
}: DataManagerProviderProps): FixTypeLater {
  const value = useMemo(
    () => ({
      comparisonData,
      progressData,
      leadershipData,
      ministryData,
    }),
    [comparisonData, progressData, leadershipData, ministryData]
  )

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  )
}

export { DataManagerProvider, useDataManager }
