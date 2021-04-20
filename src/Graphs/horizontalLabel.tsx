import React from 'react'

import { BarDatum, LabelFormatter } from '@nivo/bar'
import { Margin } from '@nivo/core'
import { parseFloatClean } from '../Helpers/formatter'
import Dictionary from '../@types/Dictionary'

export const horizontalLabel = (
  margins: Margin,
  width: number,
  maxItem: number,
  formatter: (d: string | number) => string
): LabelFormatter => {
  const labelBuilder = (d: string | number) => {
    const numD = parseFloatClean(d) || 0
    const numWidth = isNaN(width) ? 1 : width
    const numMaxItem = maxItem === 0 ? 0.001 : maxItem

    const dx =
      3 +
      (numD * (numWidth - margins.right - margins.left - 25)) / 2 / numMaxItem

    return ((
      <tspan dy={0} dx={dx} style={{ textAnchor: 'start' }}>
        {formatter(d)}
      </tspan>
    ) as unknown) as string
  }
  return labelBuilder
}

export const labelValue = (d: BarDatum): string => {
  const label = ((d.data as unknown) as Dictionary<string>)[`${d.id}_str`]
  return label
}
