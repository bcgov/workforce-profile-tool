import React from 'react'
import {
  IndicatorsOfProgress2018RawDataType,
  Leadership2018RawDataType,
} from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'

type DataManagerContextType = {
  indicatorsOfProgressData?: IndicatorsOfProgress2018RawDataType[]
  leadershipData?: Leadership2018RawDataType[]
}

const DataManagerContext = React.createContext<
  DataManagerContextType | undefined
>(undefined)

function useDataManager(): DataManagerContextType {
  const context = React.useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const { indicatorsOfProgressData, leadershipData } = context

  return {
    indicatorsOfProgressData,
    leadershipData,
  }
}

interface IDataManagerProviderProps {
  children: React.ReactNode
  indicatorsOfProgressData?: IndicatorsOfProgress2018RawDataType[]
  leadershipData?: Leadership2018RawDataType[]
}

function DataManagerProvider({
  children,
  indicatorsOfProgressData,
  leadershipData,
}: IDataManagerProviderProps): FixTypeLater {
  const value = React.useMemo(
    () => ({
      indicatorsOfProgressData,
      leadershipData,
    }),
    [indicatorsOfProgressData, leadershipData]
  )

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  )
}

export { DataManagerProvider, useDataManager }
