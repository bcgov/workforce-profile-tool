import Dictionary from '../@types/Dictionary'
import TOOLTIPS_RAW from './tooltips.json'

const tooltips: Dictionary<Dictionary<string>> = TOOLTIPS_RAW

export const getTooltip = (key: string, year: string): string | undefined => {
  if (tooltips[key] && tooltips[key][year]) {
    return tooltips[key][year]
  }

  return undefined
}
