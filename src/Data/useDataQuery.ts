import { useQuery } from 'react-query'
import * as d3 from 'd3'

import { filterData, sortData, useDataManager } from './DataManager'
import { DataKeyEnum, YEAR_PLACEHOLDER } from '../@types/DataKeyEnum'

export interface UseDataQueryResult<T> {
  /** An array of data (of type T), or undefined if the data either is not yet
   * loaded or if there is an error. */
  data: T[]
  /** The error, if one occurs. */
  error: unknown
  /** Whether the data is currently loading; wait on this to be `true` before
   * trying to access the `data` property. */
  isLoading: boolean
}

/**
 * A wrapper around `react-query`'s `useQuery` hook to fetch data from the Data
 * Catalogue. The data key should have a `YEAR_PLACEHOLDER`, and must correspond
 * to a legitimate resource name found in the BC Data Catalogue metadata for the
 * [Workforce Profiles data set](
 * https://catalogue.data.gov.bc.ca/api/action/package_show?id=bc-public-service-workforce-profiles);
 * it is recommended to store these values in `DataKeyEnum` as necessary. Note
 * that the YEAR_PLACEHOLDER will be replaced dynamically based on the
 * currently-set `Year` query value. So, you can pass a data key like
 * `WPYYYY_Comparison` and, as the user changes the year, the data for the
 * correct year will be retrieved.
 *
 * The data is lazy-loaded when the user navigates to a page that calls
 * `useDataQuery`, and thereafter is automatically cached (for the rest of the
 * user's session) by `useQuery`).
 *
 * In addition, the data is automatically sorted and filtered according to the
 * currently-set query values for Employee Type, Designated Group, and
 * Organization (ministry) before being returned. If filtering by Organization
 * is not desirable, set the optional `doNotFilterMinistries` parameter to
 * `true`.
 *
 * @param dataKey The base data key, with the `YEAR_PLACEHOLDER` in place, e.g.
 *    `WPYYYY_Comparison`. Consider passing a member from DataKeyEnum.
 * @param doNotFilterMinistries Optional. Specify `true` to skip filtering the
 *    data down to match the currently-selected ministry (e.g. for the
 *    Organization screen).
 * @returns The result of the query; see `UseDataQueryResult`.
 *
 */
export const useDataQuery = <T>(
  dataKey: string,
  doNotFilterMinistries?: boolean
): UseDataQueryResult<T> => {
  const { metadata, queryValues, year } = useDataManager()

  const key = dataKey.replace(YEAR_PLACEHOLDER, year || '')

  // TODO: Restore next line when we can load these dynamically.
  // const url = metadata && year ? metadata[key].url : ''

  // TODO: Start of temporary code.
  const isLocalKeyTmp =
    dataKey === DataKeyEnum.Hiring || key === DataKeyEnum.Flow
  const url = isLocalKeyTmp
    ? `/data/${year}/${key}.csv`
    : metadata && year
    ? metadata[key].url
    : ''
  // TODO: End of temporary code.

  // Load the raw data.
  const { data: unfilteredData, error, isLoading } = useQuery(
    key,
    async () => {
      return ((await d3.csv(url)) as unknown) as T[]
    },
    {
      // Only enable the query if metadata and year are available.
      enabled: !!(metadata && year),
      keepPreviousData: true,
    }
  )

  const data = sortData(
    filterData(unfilteredData, queryValues, doNotFilterMinistries)
  )

  return { data, error, isLoading: isLoading || unfilteredData === undefined }
}
