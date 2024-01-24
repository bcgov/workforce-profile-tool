import { useQuery } from 'react-query'
import * as d3 from 'd3'

import { filterData, sortData, useDataManager } from './DataManager'
import { GenericRawData } from '../@types/DataTypes'
import { YEAR_PLACEHOLDER } from '../@types/DataKeyEnum'

import TOOLTIPS from './tooltips.json'

// TODO: Extract this.
// We put `limit=0` because we're only interested in the metadata for the file,
// i.e. the `fields` data.
export const METADATA_URL = `https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?limit=0&resource_id=`

export interface RawDataDictionaryEntry {
  info?: {
    notes: string
    type_override: string
    label: string
  }
  type: string
  id: string
}

type RawTooltipDataDictionaryEntry = Record<string, string>

export interface DataDictionaryEntry {
  columnKey: string
  note: string
}

export interface UseDataQueryResult<T> {
  /** An array of data (of type T), or undefined if the data either is not yet
   * loaded or if there is an error. */
  data: T[]
  /** An array of data information, if available. */
  dataDictionary: DataDictionaryEntry[]
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
export const useDataQuery = <T extends GenericRawData>(
  dataKey: string,
  doNotFilterMinistries?: boolean
): UseDataQueryResult<T> => {
  const { metadata, queryValues, year } = useDataManager()

  const key = dataKey.replace(YEAR_PLACEHOLDER, year || '')

  const url = metadata && metadata[key] && year ? metadata[key].csvURL : ''

  console.log('url', url)

  // Restore when Data Catalogue loading is viable again.
  // const metadataUrl =
  //   metadata && year && year !== '2022'
  //     ? METADATA_URL.concat(metadata[key].id)
  //     : undefined

  // Load the raw data.
  const {
    data: results,
    error,
    isLoading,
  } = useQuery(
    key,
    async () => {
      // Handle CSV data.
      const data = (await d3.csv(url)) as unknown as T[]

      // Restore when Data Catalogue loading is viable again.
      // const dataDictionary = metadataUrl
      //   ? ((await d3.json(metadataUrl)) as IntentionalAny).result.fields
      //   : [] // If there's no metadataUrl, just return empty array

      const dataDictionary = TOOLTIPS

      return {
        data,
        dataDictionary,
      }
    },
    {
      // Only enable the query if metadata and year are available.
      enabled: !!(metadata && year),
      keepPreviousData: true,
    }
  )

  const filteredAndSortedData = sortData(
    filterData(results?.data, queryValues, doNotFilterMinistries)
  )

  // Restore when Data Catalogue loading is viable again.
  // const filteredDataDictionary = results?.dataDictionary
  //   .filter(
  //     (d: RawDataDictionaryEntry) =>
  //       d.info && d.info.notes && d.info.notes.length > 0
  //   )
  //   .map((d: RawDataDictionaryEntry): DataDictionaryEntry => {
  //     return {
  //       columnKey: d.id,
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       note: d.info!.notes,
  //     }
  //   })
  const dataDictionary: Record<string, RawTooltipDataDictionaryEntry> =
    results?.dataDictionary || {}
  const filteredDataDictionary: DataDictionaryEntry[] = Object.keys(
    dataDictionary
  )
    .map((columnKey) => {
      if (year) {
        const note = dataDictionary[columnKey][year]
        if (note) {
          return {
            columnKey,
            note,
          }
        }
      }
      return undefined
    })
    .filter((d): d is DataDictionaryEntry => d !== undefined)

  console.log('filteredDataDictionary', filteredDataDictionary)

  return {
    data: filteredAndSortedData,
    dataDictionary: filteredDataDictionary,
    error,
    isLoading: isLoading || results === undefined,
  }
}
