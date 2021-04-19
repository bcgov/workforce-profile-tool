import Dictionary from '../@types/Dictionary'
import TOOLTIPS_RAW from '../Data/tooltips.json'

const tooltips: Dictionary<Dictionary<string>> = TOOLTIPS_RAW

export const getTooltip = (key: string, year: string): string | undefined => {
  if (tooltips && tooltips[key] && tooltips[key][year]) {
    return tooltips[key][year]
      .replace(/•/g, '<br />•')
      .replace(/\r\n/g, '<br />')
  }

  return undefined
}
