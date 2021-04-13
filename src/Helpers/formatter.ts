import { displayNameByKey } from '../Data/DataManager'

export const formatNumber = (
  number: string | number,
  zeroValue: number | string = 0
): string => {
  if (number === undefined) return ''
  if (number === 'NA') return 'NA'
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (number === 'x') return 'x'
  if (+number === 0 || number === '') return `${zeroValue}`
  return parseInt(`${number}`, 10).toLocaleString()
}

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
