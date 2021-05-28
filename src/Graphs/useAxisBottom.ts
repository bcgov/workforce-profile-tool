import { AxisProps, TickFormatter } from '@nivo/axes'
import { useMemo } from 'react'

import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  legendText: string
  format?: TickFormatter
}

export const BASE_AXIS_BOTTOM_PROPS: AxisProps = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legendPosition: 'middle',
  legendOffset: 40,
  format: (d: FixTypeLater) =>
    `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
}

export const useAxisBottom = ({ legendText, format }: Props): FixTypeLater => {
  // Only copy once
  const baseProps = useMemo(() => {
    const props = Object.assign({}, BASE_AXIS_BOTTOM_PROPS)
    props.legend = legendText
    if (format) {
      props.format = format
    }
    return props
  }, [legendText, format])

  return baseProps
}
