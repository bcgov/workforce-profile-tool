import { DataDictionaryEntry } from '../Data/useDataQuery'

/**
 * A helper function to get tooltip text based on a data key and a year. Will
 * additionally add a line break (`<br />`) after text bullets (`•`), and
 * replace CRLFs (`\r\n`) with a line break as well.
 * @param key The tooltip key in the tooltips JSON file.
 * @param dataDictionary The dictionary to look in.
 * @returns The tooltip, processed as described above, if a tooltip was found
 * for the `key` and `year`, or undefined if no tooltip was found.
 */
export const getTooltip = (
  key: string,
  dataDictionary: DataDictionaryEntry[]
): string | undefined => {
  if (dataDictionary) {
    const tooltip = dataDictionary.find((d) => d.columnKey === key)
    if (tooltip) {
      return tooltip.note.replace(/•/g, '<br />•').replace(/\r\n/g, '<br />')
    }
  }

  return undefined
}
