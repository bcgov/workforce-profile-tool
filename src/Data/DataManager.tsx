/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ArrayParam, StringParam, useQueryParams } from 'use-query-params'
import * as d3 from 'd3'

import {
  ComparisonRawData,
  EmployeeCountRawData,
  GenericRawData,
  MinistryRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import { DES_GRP_ORDERING } from '../Variables/VariableManager'
import { Metadata } from '../@types/Metadata'

type DataManagerContextType = {
  year?: string
  metadata?: FixTypeLater
  setMetadata?: FixTypeLater
  hiringTotal?: number
  employeeCount?: number
  employeeCountData?: EmployeeCountRawData[]
  lockedVars: Dictionary<string[]>
  setLockedVars: (vars: Dictionary<string[]>) => void
  queryValues?: FixTypeLater
}

const DataManagerContext = createContext<DataManagerContextType | undefined>(
  undefined
)

export const filterData = <T extends GenericRawData>(
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

export const sortData = <T extends GenericRawData>(
  data: T[] | undefined
): T[] => {
  return data
    ? data.sort((a, b) =>
        a.Des_Grp && b.Des_Grp
          ? DES_GRP_ORDERING.indexOf(a.Des_Grp) -
            DES_GRP_ORDERING.indexOf(b.Des_Grp)
          : 0
      )
    : []
}

export const getEmployeeCount = (
  employeeCountData: EmployeeCountRawData[] | undefined,
  queryValues: FixTypeLater
): number | undefined => {
  if (!employeeCountData) return undefined

  const data = filterData<EmployeeCountRawData>(employeeCountData, queryValues)

  return data.length ? +data[0].Employee_Count : undefined
}

export const getHiringTotal = (
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

export const buildMinistryData = (
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
        Value: `${d.Employees_BCPS}`,
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

  const { metadata, employeeCountData, lockedVars, setLockedVars } = context

  const [queryValues] = useQueryParams({
    Employee_Type: StringParam,
    Des_Grp: ArrayParam,
    Ministry_Key: StringParam,
    Year: StringParam,
  })

  return {
    metadata,
    queryValues,
    year: queryValues.Year || '',
    employeeCount: getEmployeeCount(employeeCountData, queryValues),
    lockedVars,
    setLockedVars,
  }
}

interface DataManagerProviderProps {
  children: ReactNode
  employeeCountData?: EmployeeCountRawData[]
}

function DataManagerProvider({
  children,
}: DataManagerProviderProps): FixTypeLater {
  const [lockedVars, setLockedVars] = useState<Dictionary<string[]>>({})
  const [metadata, setMetadata] = useState<Dictionary<Metadata>>()

  // Initial load of metadata.
  useEffect(() => {
    const loadMetadata = async () => {
      const data: FixTypeLater = await d3.json(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.REACT_APP_PACKAGE_METADATA_URL!
      )
      const newMetadata: Metadata[] = data.result.resources.map(
        (resource: Dictionary<string>) => ({
          key: resource.name,
          url: resource.url,
        })
      )
      const keyedMetadata = newMetadata.reduce(
        (obj: Dictionary<Metadata>, currentValue) => {
          obj[currentValue.key] = currentValue
          return obj
        },
        {}
      )
      console.log('Metadata loaded.', keyedMetadata)
      setMetadata(keyedMetadata)
    }

    // Load the metadata just once on load.
    loadMetadata()
  }, [])

  const value = {
    lockedVars,
    setLockedVars,
    metadata,
    setMetadata,
  }

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  )
}

export { DataManagerProvider, useDataManager }
