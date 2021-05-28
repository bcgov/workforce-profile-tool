import { AxisProps, TickFormatter } from '@nivo/axes'
import { Margin } from '@nivo/core'
import { useCallback } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { horizontalLabel, verticalLabel } from '../Graphs/labels'
import { LabelFormatter, TooltipProp } from '@nivo/bar'
import { useAxisBottom } from '../Graphs/useAxisBottom'
import { useAxisLeft } from '../Graphs/useAxisLeft'
import { useTooltip } from '../Graphs/useTooltip'

export interface UseGraphReturnType {
  axisBottom: AxisProps
  axisLeft: AxisProps
  items: number[]
  labelCallback: () => LabelFormatter
  maxItem: number
  tooltip: TooltipProp
}

export interface UseGraphProps<T> {
  bottomAxisFormat?: TickFormatter
  bottomAxisText: string
  color?: string
  data: T[]
  dataDefinitions: DataDefinition<T>[]
  dataKeys: (keyof T)[]
  formatter: (s: string) => string
  labelIsVertical?: boolean
  margins: Margin
  maxItemComparator?: number
  width: number
}

const useGraph = <T,>({
  bottomAxisFormat,
  bottomAxisText,
  data,
  dataDefinitions,
  dataKeys,
  formatter,
  labelIsVertical,
  margins,
  maxItemComparator,
  width,
}: UseGraphProps<T>): UseGraphReturnType => {
  const items = data
    .map((datum): number[] => {
      return dataKeys.map((e): number => +datum[e])
    })
    .flat()

  const maxItem = Math.max(...items, maxItemComparator || 0)

  const labelCallback = useCallback(() => {
    const labelFormatter = labelIsVertical ? verticalLabel : horizontalLabel
    return labelFormatter(margins, width, maxItem, formatter)
  }, [maxItem, width])

  const axisLeft = useAxisLeft({ width })

  const axisBottom = useAxisBottom({
    legendText: bottomAxisText,
    format: bottomAxisFormat,
  })

  const tooltip = useTooltip({ dataDefinitions, formatter })

  return { maxItem, items, labelCallback, axisLeft, axisBottom, tooltip }
}

export default useGraph
