import * as d3 from 'd3'
import { useQuery } from 'react-query'

import { filterData, sortData, useDataManager } from './DataManager'

export const YEAR_PLACEHOLDER = 'YYYY'

export type UseDataQueryResult<T> = {
  data: T[]
  error: unknown
  isLoading: boolean
}

export const useDataQuery = <T>(
  dataKey: string,
  year: string | undefined,
  doNotFilterMinistries?: boolean
): UseDataQueryResult<T> => {
  const { metadata, queryValues } = useDataManager()

  const key = dataKey.replace(YEAR_PLACEHOLDER, year || '')

  const url = metadata && year ? metadata[key].url : ''

  // Load the raw data.
  const { data: unfilteredData, error, isLoading } = useQuery(
    key,
    async () => {
      return ((await d3.csv(url)) as unknown) as T[]
    },
    {
      enabled: !!(metadata && year),
      keepPreviousData: true,
    }
  )

  const data = sortData(
    filterData(unfilteredData, queryValues, doNotFilterMinistries)
  )

  return { data, error, isLoading: isLoading || unfilteredData === undefined }
}
