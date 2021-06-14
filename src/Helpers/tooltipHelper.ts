import Dictionary from '../@types/Dictionary'
import TOOLTIPS_RAW from '../Data/tooltips.json'

// The raw tooltips. One day we will likely want to load this from a remote
// source.
const tooltips: Dictionary<Dictionary<string>> = TOOLTIPS_RAW

/**
 * A helper function to get tooltip text based on a data key and a year. Will
 * additionally add a line break (`<br />`) after text bullets (`•`), and
 * replace CRLFs (`\r\n`) with a line break as well.
 * @param key The tooltip key in the tooltips JSON file.
 * @param year The year sub-key in the tooltips JSON file.
 * @returns The tooltip, processed as described above, if a tooltip was found
 * for the `key` and `year`, or undefined if no tooltip was found.
 */
export const getTooltip = (key: string, year: string): string | undefined => {
  if (tooltips && tooltips[key] && tooltips[key][year]) {
    return tooltips[key][year]
      .replace(/•/g, '<br />•')
      .replace(/\r\n/g, '<br />')
  }

  return undefined
}
