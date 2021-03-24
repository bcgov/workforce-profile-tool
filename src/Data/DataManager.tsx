import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { ArrayParam, StringParam, useQueryParams } from 'use-query-params'

import {
  ComparisonRawData,
  EmployeeCountRawData,
  GenericRawData,
  LeadershipRawData,
  MinistryRawData,
  OccupationRegionRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'

type DataManagerContextType = {
  progressData?: ProgressRawData[]
  hiringTotal?: number
  employeeCount?: number
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
  comparisonData?: ComparisonRawData[]
  employeeCountData?: EmployeeCountRawData[]
  occupationRegionData?: OccupationRegionRawData[]
  lockedVars: Dictionary<string[]>
  setLockedVars: (vars: Dictionary<string[]>) => void
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
          d.Des_Grp && queryValues.Des_Grp
            ? queryValues.Des_Grp.includes(d.Des_Grp)
            : true
        )
        .filter((d) =>
          d.Ministry_Key ? d.Ministry_Key === queryValues.Ministry_Key : true
        )
    : []
}

const getEmployeeCount = (
  employeeCountData: EmployeeCountRawData[] | undefined,
  queryValues: FixTypeLater
): number | undefined => {
  if (!employeeCountData) return undefined

  const data = filterData<EmployeeCountRawData>(employeeCountData, queryValues)

  return data.length ? +data[0].Employee_Count : undefined
}

const getHiringTotal = (
  progressData: ProgressRawData[] | undefined,
  queryValues: FixTypeLater
): number | undefined => {
  if (!progressData) return undefined

  const data = progressData?.find(
    (d) =>
      d.Employee_Type === queryValues.Employee_Type &&
      d.Des_Grp === 'AS_TOTAL' &&
      d.Ministry_Key === queryValues.Ministry_Key
  )

  return data ? +data['2020_hired_ct'] : undefined
}

function useDataManager(): DataManagerContextType {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const {
    progressData,
    leadershipData,
    ministryData,
    comparisonData,
    employeeCountData,
    occupationRegionData,
    lockedVars,
    setLockedVars,
  } = context

  const [queryValues] = useQueryParams({
    Employee_Type: StringParam,
    Des_Grp: ArrayParam,
    Ministry_Key: StringParam,
  })

  return {
    progressData: filterData(progressData, queryValues),
    hiringTotal: getHiringTotal(progressData, queryValues),
    leadershipData: filterData(leadershipData, queryValues),
    ministryData: filterData(ministryData, queryValues),
    comparisonData: filterData(comparisonData, queryValues),
    employeeCount: getEmployeeCount(employeeCountData, queryValues),
    occupationRegionData: filterData(occupationRegionData, queryValues),
    lockedVars,
    setLockedVars,
  }
}

interface DataManagerProviderProps {
  children: ReactNode
  comparisonData?: ComparisonRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
  progressData?: ProgressRawData[]
  employeeCountData?: EmployeeCountRawData[]
  occupationRegionData?: OccupationRegionRawData[]
}

function DataManagerProvider({
  children,
  comparisonData,
  progressData,
  leadershipData,
  ministryData,
  employeeCountData,
  occupationRegionData,
}: DataManagerProviderProps): FixTypeLater {
  const [lockedVars, setLockedVars] = useState<Dictionary<string[]>>({})

  const value = useMemo(
    () => ({
      comparisonData,
      progressData,
      leadershipData,
      ministryData,
      employeeCountData,
      occupationRegionData,
      lockedVars,
      setLockedVars,
    }),
    [
      employeeCountData,
      comparisonData,
      progressData,
      leadershipData,
      ministryData,
      occupationRegionData,
      lockedVars,
      setLockedVars,
    ]
  )

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  )
}

export { DataManagerProvider, useDataManager }
