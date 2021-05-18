import { useCallback } from 'react'
import { horizontalLabel } from '../Graphs/labels'
import FixTypeLater from '../@types/FixTypeLater'

export interface UseGraphReturnType {
  maxItem: number
  items: number[]
  labelCallback: FixTypeLater
}

export interface UseGraphProps {
  data: FixTypeLater[]
  dataKeys: FixTypeLater[]
  maxItemComparator?: number
  width: number
  formatter: FixTypeLater
  margins: FixTypeLater
}

const useGraph = ({
  data,
  dataKeys,
  maxItemComparator,
  width,
  formatter,
  margins,
}: UseGraphProps): UseGraphReturnType => {
  const items = data
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items, maxItemComparator || 0)

  const labelCallback = useCallback(() => {
    return horizontalLabel(margins, width, maxItem, (d: FixTypeLater) => {
      return formatter(d)
    })
  }, [maxItem, width])

  return { maxItem, items, labelCallback }
}

export default useGraph
