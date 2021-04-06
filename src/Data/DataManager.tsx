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
import { DES_GRP_ORDERING } from '../Variables/VariableManager'

type DataManagerContextType = {
  year?: string
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

const sortData = <T extends GenericRawData>(data: T[] | undefined): T[] => {
  return data
    ? data.sort((a, b) =>
        a.Des_Grp && b.Des_Grp
          ? DES_GRP_ORDERING.indexOf(a.Des_Grp) -
            DES_GRP_ORDERING.indexOf(b.Des_Grp)
          : 0
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

const buildMinistryData = (
  comparisonData: ComparisonRawData[] | undefined,
  queryValues: FixTypeLater
): MinistryRawData[] => {
  // console.log('COMPARISON DATA', comparisonData)
  if (!comparisonData) return []
  const data = comparisonData
    .filter((d) =>
      d.Employee_Type ? d.Employee_Type === queryValues.Employee_Type : true
    )
    .filter((d) =>
      d.Des_Grp && queryValues.Des_Grp
        ? queryValues.Des_Grp.includes(d.Des_Grp)
        : true
    )
    .map((d) => {
      return {
        Des_Grp: d.Des_Grp,
        Ministry_Key: d.Ministry_Key,
        Value: `${d.Employees_BCPS}${isNaN(+d.Employees_BCPS) ? '' : '%'}`,
      }
    })

  const bcPops = comparisonData.filter(
    (d) => d.Ministry_Key === 'BCPS' && d.Employee_Type === 'REG'
  )

  data.push({
    Des_Grp: 'IND',
    Ministry_Key: 'BC Population',
    Value: bcPops.find((d) => d.Des_Grp === 'IND')
      ? bcPops.find((d) => d.Des_Grp === 'IND')!.Employees_BC_Population
      : '',
  })
  data.push({
    Des_Grp: 'WOM',
    Ministry_Key: 'BC Population',
    Value: bcPops.find((d) => d.Des_Grp === 'WOM')
      ? bcPops.find((d) => d.Des_Grp === 'WOM')!.Employees_BC_Population
      : '',
  })
  data.push({
    Des_Grp: 'VM',
    Ministry_Key: 'BC Population',
    Value: bcPops.find((d) => d.Des_Grp === 'VM')
      ? bcPops.find((d) => d.Des_Grp === 'VM')!.Employees_BC_Population
      : '',
  })
  data.push({
    Des_Grp: 'DIS',
    Ministry_Key: 'BC Population',
    Value: bcPops.find((d) => d.Des_Grp === 'DIS')
      ? bcPops.find((d) => d.Des_Grp === 'DIS')!.Employees_BC_Population
      : '',
  })

  return data
}

function useDataManager(): DataManagerContextType {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const {
    progressData,
    leadershipData,
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
    Year: StringParam,
  })

  return {
    year: queryValues.Year || '',
    progressData: sortData(filterData(progressData, queryValues)),
    hiringTotal: getHiringTotal(progressData, queryValues),
    leadershipData: sortData(filterData(leadershipData, queryValues)),
    ministryData: sortData(buildMinistryData(comparisonData, queryValues)),
    comparisonData: sortData(filterData(comparisonData, queryValues)),
    employeeCount: getEmployeeCount(employeeCountData, queryValues),
    occupationRegionData: sortData(
      filterData(occupationRegionData, queryValues)
    ),
    lockedVars,
    setLockedVars,
  }
}

interface DataManagerProviderProps {
  children: ReactNode
  comparisonData?: ComparisonRawData[]
  leadershipData?: LeadershipRawData[]
  progressData?: ProgressRawData[]
  employeeCountData?: EmployeeCountRawData[]
  occupationRegionData?: OccupationRegionRawData[]
}

function DataManagerProvider({
  children,
  comparisonData,
  progressData,
  leadershipData,
  employeeCountData,
  occupationRegionData,
}: DataManagerProviderProps): FixTypeLater {
  const [lockedVars, setLockedVars] = useState<Dictionary<string[]>>({})

  const value = useMemo(
    () => ({
      comparisonData,
      progressData,
      leadershipData,
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
