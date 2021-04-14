import * as d3 from 'd3'
import { useQuery } from 'react-query'

import { filterData, sortData, useDataManager } from './DataManager'

export type UseDataQueryResult<T> = {
  data: T[]
  error: unknown
  isLoading: boolean
}

export const useDataQuery = <T>(
  dataKey: string,
  doNotFilterMinistries?: boolean
): UseDataQueryResult<T> => {
  const { metadata, queryValues } = useDataManager()

  const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  const { data: unfilteredData, error, isLoading } = useQuery(
    dataKey,
    async () => {
      return ((await d3.csv(url)) as unknown) as T[]
    },
    {
      enabled: !!metadata,
      keepPreviousData: true,
    }
  )

  const data = sortData(
    filterData(unfilteredData, queryValues, doNotFilterMinistries)
  )

  return { data, error, isLoading: isLoading || unfilteredData === undefined }
}
