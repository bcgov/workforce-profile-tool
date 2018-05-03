export const formatNumber = (number, zeroValue = 0) => {
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (+number === 0 || number === '') return zeroValue
  return parseInt(number, 10).toLocaleString()
}

export const formatPercent = (number, decimals = 0) => {
  return number.toLocaleString('en', { style: 'percent', minimumFractionDigits: decimals })
}

export const parseIntClean = (number, zeroValue = 0) => {
  if (number === 'S') return -1
  if (number === '<3') return zeroValue
  if (+number === 0 || number === '') return zeroValue
  return parseInt(number, 10)
}