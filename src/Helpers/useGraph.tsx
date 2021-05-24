import React, { useCallback } from 'react'

import { horizontalLabel, labelValue, verticalLabel } from '../Graphs/labels'
import FixTypeLater from '../@types/FixTypeLater'
import { ResponsiveBar } from '@nivo/bar'
import { NIVO_BASE_PROPS } from './graphs'
import Color from 'color'

export interface UseGraphReturnType {
  maxItem: number
  items: number[]
  labelCallback: FixTypeLater
  // graph: JSX.Element
}

export interface UseGraphProps {
  data: FixTypeLater[]
  dataKeys: FixTypeLater[]
  maxItemComparator?: number
  width: number
  formatter: FixTypeLater
  margins: FixTypeLater
  color?: string
  additionalLayers?: FixTypeLater
  labelIsVertical?: boolean
}

const useGraph = ({
  data,
  dataKeys,
  maxItemComparator,
  width,
  formatter,
  margins,
  color,
  additionalLayers,
  labelIsVertical,
}: UseGraphProps): UseGraphReturnType => {
  const items = data
    .map((d: FixTypeLater): number[] => {
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

  return { maxItem, items, labelCallback }
}

export default useGraph
