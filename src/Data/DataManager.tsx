/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ArrayParam, StringParam, useQueryParams } from 'use-query-params'
import * as d3 from 'd3'

import {
  EmployeeCountRawData,
  GenericRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import { Metadata } from '../@types/Metadata'
import { QueryValues } from '../@types/QueryValues'
import { Variable } from '../@types/Variable'
import { VariableGroup } from '../@types/VariableGroup'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'

import variableJson from './variables.json'

export const VARIABLE_MAP = variableJson as Dictionary<VariableGroup>

export const variableGroupByKey = (variableGroupKey: string): VariableGroup => {
  return VARIABLE_MAP[variableGroupKey]
}

export const indexOfVariable = (
  variableGroupKey: string,
  variableKey: string
): number => {
  return VARIABLE_MAP[variableGroupKey].variables.findIndex(
    (v) => v.key === variableKey
  )
}

export const variableByKey = (
  variableGroupKey: string,
  variableKey: string | null
): Variable | undefined => {
  return VARIABLE_MAP[variableGroupKey].variables.find(
    (v) => v.key === variableKey
  )
}

export const displayNameByKey = (
  variableGroupKey: string,
  variableKey: string[] | string | null | undefined
): string => {
  if (!variableKey) return ''
  if (Array.isArray(variableKey)) {
    const name = variableKey.map(
      (varKey) => variableByKey(variableGroupKey, varKey)!.name
    )
    return name.join(', ')
  } else {
    const variable = variableByKey(variableGroupKey, variableKey)
    return variable ? variable.name : ''
  }
}

export const shortDisplayNameByKey = (
  variableGroupKey: string,
  variableKey: string
): string => {
  if (!variableKey) return ''
  const variable = variableByKey(variableGroupKey, variableKey)
  return variable && variable.shortName ? variable.shortName : ''
}

export const getLocalStorageValue = (key: string): string | string[] | null => {
  const savedVarsString = window.localStorage.getItem(
    'workforce-profiles-saved-vars'
  )
  if (savedVarsString) {
    const savedVars = JSON.parse(savedVarsString)
    console.log('savedVars', savedVars)
    return savedVars[key]
  }
  return null
}

export const setLocalStorageValue = (
  key: string,
  value: string | string[] | null
): void => {
  const savedVarsString = window.localStorage.getItem(
    'workforce-profiles-saved-vars'
  )
  if (savedVarsString) {
    const savedVars = JSON.parse(savedVarsString)
    savedVars[key] = value
    window.localStorage.setItem(
      'workforce-profiles-saved-vars',
      JSON.stringify(savedVars)
    )
  }
  return undefined
}

export const getAllLocalStorageValues = (): Dictionary<string | string[]> => {
  const savedVarsString = window.localStorage.getItem(
    'workforce-profiles-saved-vars'
  )
  if (savedVarsString) return JSON.parse(savedVarsString)
  return {}
}

export const resetLocalStorage = (): void => {
  window.localStorage.setItem(
    'workforce-profiles-saved-vars',
    JSON.stringify({})
  )
}

type UseDataManagerType = {
  year?: string
  metadata?: Dictionary<Metadata>
  setMetadata?: React.Dispatch<
    React.SetStateAction<Dictionary<Metadata> | undefined>
  >
  hiringTotal?: number
  employeeCount?: number
  employeeCountData?: EmployeeCountRawData[]
  lockedVars: Dictionary<string[]>
  setLockedVars: (vars: Dictionary<string[]>) => void
  queryValues: QueryValues
}

type DataManagerContextType = {
  metadata?: Dictionary<Metadata>
  setMetadata?: React.Dispatch<
    React.SetStateAction<Dictionary<Metadata> | undefined>
  >
  lockedVars: Dictionary<string[]>
  setLockedVars: (vars: Dictionary<string[]>) => void
}

const DataManagerContext = createContext<DataManagerContextType | undefined>(
  undefined
)

export const filterData = <T extends GenericRawData>(
  data: T[] | undefined,
  queryValues: QueryValues,
  doNotFilterMinistries?: boolean
): T[] => {
  if (!data) return []
  let filteredData = data
    .filter((d) =>
      d.Employee_Type ? d.Employee_Type === queryValues.Employee_Type : true
    )
    .filter((d) =>
      d.Des_Grp && queryValues.Des_Grp
        ? queryValues.Des_Grp.includes(d.Des_Grp)
        : true
    )

  if (!doNotFilterMinistries) {
    filteredData = filteredData.filter((d) =>
      d.Ministry_Key ? d.Ministry_Key === queryValues.Ministry_Key : true
    )
  }

  return filteredData
}

export const sortData = <T extends GenericRawData>(
  data: T[] | undefined
): T[] => {
  return data
    ? data.sort((a, b) =>
        a.Des_Grp && b.Des_Grp
          ? indexOfVariable('Des_Grp', a.Des_Grp) -
            indexOfVariable('Des_Grp', b.Des_Grp)
          : 0
      )
    : []
}

export const getEmployeeCount = (
  employeeCountData: EmployeeCountRawData[] | undefined,
  queryValues: QueryValues
): number | undefined => {
  if (!employeeCountData) return undefined

  const data = filterData<EmployeeCountRawData>(employeeCountData, queryValues)

  return data.length ? +data[0].Employee_Count : undefined
}

export const getHiringTotal = (
  progressData: ProgressRawData[] | undefined,
  queryValues: QueryValues
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

function useDataManager(): UseDataManagerType {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const { metadata, lockedVars, setLockedVars } = context

  const [queryValuesTmp, setQueryValues] = useQueryParams({
    Employee_Type: StringParam,
    Des_Grp: ArrayParam,
    Ministry_Key: StringParam,
    Year: StringParam,
  })

  const queryValues = queryValuesTmp as QueryValues
  const queryValuesCopy: Dictionary<FixTypeLater> = Object.assign(
    {},
    queryValues
  )

  const _setLockedVars = useCallback(
    (varsToLock: Dictionary<string[]>) => {
      console.log('SETTING LOCKED VARS')

      // // For every query value, check if it is being locked. If it IS, then save
      // // its value, but only if it's not already saved. If it's NOT, then load
      // // its value, and clear the saved value.
      // Object.keys(queryValues).forEach((queryValueKey) => {
      //   if (varsToLock[queryValueKey]) {
      //     console.log('LOCKING', queryValueKey)
      //     if (!getLocalStorageValue(queryValueKey)) {
      //       setLocalStorageValue(
      //         queryValueKey,
      //         queryValuesCopy[queryValueKey as keyof QueryValues]
      //       )
      //     }
      //   } else {
      //     const value = getLocalStorageValue(queryValueKey)
      //     console.log('queryValueKey', queryValueKey, value)
      //     if (value) {
      //       console.log('in here')
      //       queryValuesCopy[queryValueKey] = value
      //     }
      //     setLocalStorageValue(queryValueKey, null)
      //   }
      // })

      // // Now, set the query values
      // setQueryValues(queryValuesCopy)

      if (Object.keys(varsToLock).length === 0) {
        const previouslySavedVars = getAllLocalStorageValues()
        setQueryValues(previouslySavedVars)
        resetLocalStorage()
      } else {
        // Save the values that are about to get locked, but only if they do not
        // already exist in the saved state
        Object.keys(varsToLock).forEach((key) => {
          console.log('key', key)
          // Iff no value is set for this key...
          if (!getLocalStorageValue(key)) {
            console.log('in here')
            // ...set it
            setLocalStorageValue(key, queryValues[key as keyof QueryValues])
          }
        })
      }

      setLockedVars(varsToLock)
    },
    [queryValuesTmp, setQueryValues]
  )

  return {
    metadata,
    queryValues,
    year: queryValues.Year || '',
    employeeCount: undefined, // TODO: Fix
    lockedVars,
    setLockedVars: _setLockedVars,
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
  // const [variableMap, setVariableMap] = useState<Dictionary<VariableGroup>>(VARIABLE_MAP)

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

      // VARIABLE_MAP['Ministry_Key'].variables = []

      // const newVariableMap: Dictionary<VariableGroup> = Object.assign(
      //   {},
      //   variableMap
      // )
      // newVariableMap['Ministry_Key'].variables = []
      // setVariableMap(newVariableMap)
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
