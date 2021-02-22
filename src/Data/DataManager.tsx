import React from 'react'

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

const DataManagerContext = React.createContext<
  DataManagerContextType | undefined
>(undefined)

function useDataManager(): DataManagerContextType {
  const context = React.useContext(DataManagerContext)
  if (!context) {
    throw new Error(`useDataManager must be used within a DataManagerProvider`)
  }

  const { progressData: progressData, leadershipData, ministryData } = context

  return {
    progressData: progressData,
    leadershipData,
    ministryData,
  }
}

interface IDataManagerProviderProps {
  children: React.ReactNode
  progressData?: ProgressRawData[]
  leadershipData?: LeadershipRawData[]
  ministryData?: MinistryRawData[]
}

function DataManagerProvider({
  children,
  progressData,
  leadershipData,
  ministryData,
}: IDataManagerProviderProps): FixTypeLater {
  const value = React.useMemo(
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
