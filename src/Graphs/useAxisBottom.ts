import { AxisProps, TickFormatter } from '@nivo/axes'
import { useMemo } from 'react'

interface Props {
  format?: TickFormatter
  legendText: string
}

export const BASE_AXIS_BOTTOM_PROPS: AxisProps = {
  format: (d) =>
    `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
  legendOffset: 40,
  legendPosition: 'middle',
  tickPadding: 5,
  tickRotation: 0,
  tickSize: 5,
}

export const useAxisBottom = ({ legendText, format }: Props): AxisProps => {
  // Only copy once
  const baseProps = useMemo(() => {
    const props = Object.assign({}, BASE_AXIS_BOTTOM_PROPS)
    props.legend = legendText
    if (format) props.format = format
    return props
  }, [legendText, format])

  return baseProps
}
