import { useCallback } from 'react'

import { horizontalLabel, verticalLabel } from '../Graphs/labels'
import FixTypeLater from '../@types/FixTypeLater'
import { useAxisLeft } from '../Graphs/useAxisLeft'

export interface UseGraphReturnType {
  maxItem: number
  items: number[]
  labelCallback: FixTypeLater
  axisLeft: FixTypeLater
}

export interface UseGraphProps<T> {
  data: T[]
  dataKeys: string[]
  maxItemComparator?: number
  width: number
  formatter: FixTypeLater
  margins: FixTypeLater
  color?: string
  additionalLayers?: FixTypeLater
  labelIsVertical?: boolean
}

const useGraph = <T,>({
  data,
  dataKeys,
  maxItemComparator,
  width,
  formatter,
  margins,
  labelIsVertical,
}: UseGraphProps<T>): UseGraphReturnType => {
  const items = data
    .map((d): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items, maxItemComparator || 0)

  const labelCallback = useCallback(() => {
    const labelFormatter = labelIsVertical ? verticalLabel : horizontalLabel
    return labelFormatter(margins, width, maxItem, (d: FixTypeLater) => {
      return formatter(d)
    })
  }, [maxItem, width])

  const axisLeft = useAxisLeft({ width })

  return { maxItem, items, labelCallback, axisLeft }
}

export default useGraph
