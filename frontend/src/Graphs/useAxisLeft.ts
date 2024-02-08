import { AxisProps } from '@nivo/axes'
import { useCallback, useMemo } from 'react'
import FixTypeLater from '../@types/FixTypeLater'

import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { GRAPH_WIDTH_BREAKPOINT } from '../Helpers/graphs'

interface Props {
  /** The width of the chart in pixels. */
  width: number
}

export const BASE_AXIS_LEFT_PROPS: AxisProps = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legendPosition: 'middle',
  legendOffset: 32,
}

/** Hook to provide the props for a left axis on a Nivo chart. */
export const useAxisLeft = ({ width }: Props): AxisProps => {
  // The formatter depends on the width of the graph.
  const formatter = useCallback(
    (d: FixTypeLater) =>
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
