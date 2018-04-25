export const formatNumber = (number, zeroValue = 0) => {
  if (number === 'S') return 'S'
  if (number === '<3') return '<3'
  if (+number === 0 || number === '') return zeroValue
  return parseInt(number, 10).toLocaleString()
}
