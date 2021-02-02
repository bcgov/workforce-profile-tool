export const formatNumber = (
  number: string | number,
  zeroValue: number | string = 0
): string => {
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
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (number === 'x') return 'x'
  return (+number / divisor).toLocaleString('en', {
    style: 'percent',
    minimumFractionDigits: decimals,
  })
}

export const parseIntClean = (number: string, zeroValue = 0): number => {
  if (number === 'S') return zeroValue
  if (number === '<3') return zeroValue
  if (number === 'x') return zeroValue
  if (+number === 0 || number === '') return zeroValue
  return parseInt(number, 10)
}

export const parseFloatClean = (number: string, zeroValue = 0): number => {
  if (number === 'S') return zeroValue
  if (number === '<3') return zeroValue
  if (number === 'x') return zeroValue
  if (+number === 0 || number === '') return zeroValue
  return parseFloat(number)
}
