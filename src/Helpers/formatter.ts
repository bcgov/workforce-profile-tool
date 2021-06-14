import { displayNameByKey } from '../Data/DataManager'

/**
 * Takes a number-like value from the Workforce Profiles data set (which could
 * be an actual number, or 'NA', 'S', '<3', or 'x' for data that is unavailable
 * or suppressed) and either returns the corresponding suppression value or the
 * integer representation of the number.
 *
 * @param number The string that represents a number-like value.
 * @param zeroValue The value to return if the number is either zero or empty
 *     string.
 * @returns A string representing the `number`, formatted as a percent, if
 *     `number` is actually numeric; or `''` (if number is undefined), `NA`,
 *     `S`, `<3`, or `x` if `number` is one of those values.
 */
export const formatNumber = (
  number: string | number,
  zeroValue: number | string = 0
): string => {
  console.log(number)
  if (number === undefined || number === 'undefined') return ''
  if (number === 'NA') return 'NA'
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (number === 'x') return 'x'
  if (+number === 0 || number === '') return `${zeroValue}`
  return parseInt(`${number}`, 10).toLocaleString()
}

/**
 * Takes a number-like value from the Workforce Profiles data set (which could
 * be an actual number, or 'NA', 'S', '<3', or 'x' for data that is unavailable
 * or suppressed) and either returns the corresponding suppression value or the
 * number itself, formatted as a percent.
 *
 * @param number The string that represents a number-like value.
 * @param decimals Optional. The number of decimals to retain. Default is 0.
 * @param divisor Optional. The divisor for `number`. Default is 1.
 * @returns A string representing the `number`, formatted as a percent, if
 *     `number` is actually numeric; or `''` (if number is undefined), `NA`,
 *     `S`, `<3`, or `x` if `number` is one of those values.
 */
export const formatPercent = (
  number: string | number,
  decimals = 0,
  divisor = 1
): string => {
  if (number === undefined) return ''
  if (number === 'NA') return 'NA'
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (number === 'x') return 'x'
  return (+number / divisor).toLocaleString('en', {
    style: 'percent',
    minimumFractionDigits: decimals,
  })
}

export const parseIntClean = (
  number: string | number,
  zeroValue = 0
): number => {
  if (typeof number === 'number') return Math.floor(number)
  if (number === 'NA') return zeroValue
  if (number === 'S') return zeroValue
  if (number === '<3') return zeroValue
  if (number === 'x') return zeroValue
  if (number === '') return zeroValue
  return parseInt(number, 10)
}

export const parseFloatClean = (
  number: string | number,
  zeroValue = 0
): number => {
  if (typeof number === 'number') return number
  if (number === 'NA') return zeroValue
  if (number === 'S') return zeroValue
  if (number === '<3') return zeroValue
  if (number === 'x') return zeroValue
  if (number === '') return zeroValue
  return parseFloat(number)
}

export const formatDesGrpTick = (desGrpKey: string): string => {
  return displayNameByKey('Des_Grp', desGrpKey as string) || ''
}
