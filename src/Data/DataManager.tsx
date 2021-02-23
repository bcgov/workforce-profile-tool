import React, { ReactNode, createContext, useContext, useMemo } from 'react'
import {
  ArrayParam,
  StringParam,
  useQueryParam,
  useQueryParams,
} from 'use-query-params'

import {
  GenericRawData,
  LeadershipRawData,
  MinistryRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'

type DataManagerContextType = {
  progressData?: ProgressRawData[]
  hiringTotal?: number
  filteredProgressData?: ProgressRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
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

  const { progressData, leadershipData, ministryData } = context

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
  }
}

interface DataManagerProviderProps {
  children: ReactNode
  progressData?: ProgressRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
}

function DataManagerProvider({
  children,
  progressData,
  leadershipData,
  ministryData,
}: DataManagerProviderProps): FixTypeLater {
  const value = useMemo(
    () => ({
      progressData,
      leadershipData,
      ministryData,
    }),
    [progressData, leadershipData, ministryData]
  )

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  )
}

export { DataManagerProvider, useDataManager }
