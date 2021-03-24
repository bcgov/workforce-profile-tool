import * as d3 from 'd3'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'

export const ticks = <T extends Dictionary<FixTypeLater>>(
  data: T[],
  keys: string[]
): number[] => {
  const domainValues: number[] = []

  data.forEach((d) => {
    Object.keys(d).forEach((k) => {
      if (keys.includes(k)) {
        domainValues.push(+d[k])
      }
    })
  })

  const max = d3.max(domainValues) as number
  const scale = d3.scaleLinear().domain([0, max]).range([0, max])
  return scale.nice().ticks()
}
