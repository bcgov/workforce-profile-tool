import { AxisProps } from '@nivo/axes'
import { useCallback, useMemo } from 'react'

import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { GRAPH_WIDTH_BREAKPOINT } from '../Helpers/graphs'

interface Props {
  width: number
}

export const BASE_AXIS_LEFT_PROPS: AxisProps = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legendPosition: 'middle',
  legendOffset: 32,
}

export const useAxisLeft = ({ width }: Props): AxisProps => {
  const formatter = useCallback(
    (d) =>
      (width < GRAPH_WIDTH_BREAKPOINT
        ? shortDisplayNameByKey('Des_Grp', d)
        : displayNameByKey('Des_Grp', d)) as string,
    [width]
  )

  // Only copy once
  const baseProps = useMemo(() => Object.assign({}, BASE_AXIS_LEFT_PROPS), [])

  baseProps.format = formatter

  return baseProps
}
