import React from 'react'
import Dictionary from '../@types/Dictionary'

import FixTypeLater from '../@types/FixTypeLater'
import { parseFloatClean } from '../Helpers/formatter'

export const horizontalLabel = (
  margins: FixTypeLater,
  width: number,
  maxItem: number,
  formatter: FixTypeLater
): FixTypeLater => {
  const labelBuilder = (d: FixTypeLater) => {
    // console.log('d -->', d)
    const numD = parseFloatClean(d)
    return ((
      <tspan
        dy={0}
        dx={`${
          3 + (numD * (width - margins.right - margins.left - 25)) / 2 / maxItem
        }`}
        style={{ textAnchor: 'start' }}
      >
        {formatter(d)}
      </tspan>
    ) as unknown) as string
  }
  return labelBuilder
}

export const labelValue = (d: FixTypeLater) => {
  const label = ((d.data as unknown) as Dictionary<FixTypeLater>)[`${d.id}_str`]
  // console.log('d', d)
  return label
}
