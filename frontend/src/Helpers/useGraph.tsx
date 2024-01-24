import { Margin } from '@nivo/core'
import { useCallback } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import FixTypeLater from '../@types/FixTypeLater'
import { horizontalLabel, verticalLabel } from '../Graphs/labels'
import { useAxisBottom } from '../Graphs/useAxisBottom'
import { useAxisLeft } from '../Graphs/useAxisLeft'
import { useTooltip } from '../Graphs/useTooltip'

// export interface UseGraphReturnType {
//   /** A bottom axis for a Nivo chart. */
//   axisBottom: AxisProps
//   /** A left axis for a Nivo chart. */
//   axisLeft: AxisProps
//   /** All numeric values for all rows and all supplied columns. Can be useful
//    * when examining the extent of the data.
//    */
//   items: number[]
//   /** The callback to use for the label next to the bar on a chart. */
//   labelCallback: () => LabelFormatter
//   /** The maximum numeric value across all rows and supplied columns. */
//   maxItem: number
//   /** A tooltip for a Nivo chart (shown when hovering on a bar). */
//   tooltip: TooltipProp
// }

export interface UseGraphProps<T> {
  /** The formatter to use for labels on the bottom axis. */
  bottomAxisFormat?: FixTypeLater // TODO: Can we do better?
  /** The label (legend) for the bottom axis. */
  bottomAxisText: string
  /** The data (typically WFP data) to graph. */
  data: T[]
  /** The data definitions (i.e. column definitions) for the data to graph. */
  dataDefinitions: DataDefinition<T>[]
  /** The keys of the data to graph. */
  dataKeys: (keyof T)[]
  /** The formatter to use when displaying the data values. */
  formatter: (s: string) => string
  /** Is the bar vertical? If so, a different labelling function is supplied. */
  labelIsVertical?: boolean
  /** The margins of the chart. */
  margins: Margin
  /** Do we need to compare a one-off value when finding the max value? This is
   * used to ensure the BC Pop line on the Organizations graph can still be
   * shown, even if it is well above any individual organization's
   * representation of that designated group.
   */
  maxItemComparator?: number
  /** The width of the chart. */
  width: number
}

/** A hook to generate the items required for a Nivo chart in the app. */
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
}: UseGraphProps<T>) => {
  // The raw data values for all the columns in the data used for the chart.
  // Finding the maximum value is required for figuring out where to place the
  // labels on the ends of horizontal bars.
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
