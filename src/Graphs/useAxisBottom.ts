import { AxisProps } from '@nivo/axes'
import { useMemo } from 'react'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  /** The formatter function for the axis ticks. */
  format?: FixTypeLater
  /** The axis label. */
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

/** Hook to provide the props for a bottom axis on a Nivo chart. */
export const useAxisBottom = ({ legendText, format }: Props): AxisProps => {
  // Return the base props for the Nivo axis, and update whenever the formatter
  // or legend text change.
  const baseProps = useMemo(() => {
    const props = Object.assign({}, BASE_AXIS_BOTTOM_PROPS)
    props.legend = legendText
    if (format) props.format = format
    return props
  }, [legendText, format])

  return baseProps
}
