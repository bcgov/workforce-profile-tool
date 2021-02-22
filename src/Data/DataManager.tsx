import React, { ReactNode, createContext, useContext, useMemo } from 'react'

import {
  LeadershipRawData,
  MinistryRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'

type DataManagerContextType = {
  progressData?: ProgressRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
}

const DataManagerContext = createContext<DataManagerContextType | undefined>(
  undefined
)

function useDataManager(): DataManagerContextType {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const { progressData, leadershipData, ministryData } = context

  return {
    progressData,
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
