import {
  BarLayer,
  BarSvgProps,
  ComputedBarDatum,
  ComputedBarDatumWithValue,
  ComputedDatum,
} from '@nivo/bar'
import Color from 'color'

import { DataDefinition } from '../@types/DataDefinition'
import { DesignatedGroupKeyedData } from '../@types/DataTypes'
import { formatPercent, parseFloatClean } from './formatter'
import FixTypeLater from '../@types/FixTypeLater'
import { formatNumber } from './formatter'

export const BAR_H_GAP_SIZE = 3 // Horizontal space between bars within a group
export const BAR_H_CATEGORY_GAP_SIZE = 30 // Horizontal space between bar groups

export const BAR_V_GAP_SIZE = 2 // Vertical space between bars within a group
export const BAR_V_CATEGORY_GAP_SIZE = 15 // Vertical space between bar groups

export const CHART_FONT = `BCSans, "myriad-pro", "Myriad Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`

// Basic parameters for the chart theme for Nivo.
export const NIVO_THEME = {
  axis: {
    legend: {
      text: {
        fontFamily: CHART_FONT,
        fontSize: '16',
      },
    },
    ticks: {
      text: {
        fontFamily: CHART_FONT,
        fontSize: '13',
      },
      line: {
        stroke: '#ccc',
        strokeWidth: 0.5,
      },
    },
  },
  labels: {
    text: {
      fontFamily: CHART_FONT,
      fontSize: '14',
    },
  },
  grid: {
    line: {
      stroke: '#ccc',
      strokeWidth: 0.5,
    },
  },
}

const labelTextColor: FixTypeLater = {
  from: 'color',
  modifiers: [['darker', 1.6]],
}

export const NIVO_BASE_PROPS: Partial<BarSvgProps<FixTypeLater>> = {
  axisRight: null,
  axisTop: null,
  borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
  groupMode: 'grouped',
  indexBy: 'Des_Grp',
  indexScale: { type: 'band', round: true },
  innerPadding: 2,
  labelSkipHeight: 0,
  labelSkipWidth: 1000,
  labelTextColor,
  layout: 'horizontal',
  // motionConfig: {
  //   damping: 15,
  //   frequency: 0.9,
  //   friction: 0.9,
  // },
  padding: 0.3,
  theme: NIVO_THEME,
  valueScale: { type: 'linear' },
  enableGridX: true,
  enableGridY: false,
}

/** Helper function to process WFP data for display on the graph. For each row
 * of WFP data, the function will map and copy the data values (leaving the
 * original data intact). For each row, `Des_Grp` will always be copied, as will
 * the values for each column specified in the `dataDefinitions` param; note
 * that all these values should be numeric (and they are in existing WFP data).
 * Extra manipulation of the data during the mapping process can be performed by
 * passing in an `additionalMapping` function.
 * @param data The WFP data to graph.
 * @param dataDefinitions The metadata for the data columns to graph.
 * @param additionalMapping Whether to perform additional mapping on the data
 * before graphing it.
 */
export const processDataForGraph = <T extends DesignatedGroupKeyedData>(
  data: T[],
  dataDefinitions: DataDefinition<T>[],
  additionalMapping?: (d: T, obj: unknown) => void
): { dataKeys: (keyof T)[]; filteredData: T[] } => {
  const dataKeys = dataDefinitions.map((d) => d.key)
  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d) => {
      const obj: FixTypeLater = { Des_Grp: d.Des_Grp }
      if (additionalMapping) {
        additionalMapping(d, obj)
      }
      dataKeys.forEach((dataKey) => {
        obj[dataKey] = parseFloatClean(d[dataKey] as unknown as number)
        obj[`${String(dataKey)}_str`] = d[dataKey]
      })
      return obj
    })
  return { dataKeys, filteredData }
}

// Default graph widths and breakpoints.
export const GRAPH_DEFAULT_WIDTH = 620
export const GRAPH_WIDTH_BREAKPOINT = 576
export const GRAPH_Y_AXIS_NARROW_WIDTH = 80

/** Helper function to determine the width of the Y-axis based on the width of
 * the graph. Tests against the breakpoint and returns a narrower width when the
 * user screen size is less than the breakpoint.
 * @param graphWidth The current width of the graph.
 * @param baseYAxisWidth The width of the graph when on a larger screen; will
 * typically vary based on the width of the Y-axis labels.
 */
export const yAxisWidthForSize = (
  graphWidth: number,
  baseYAxisWidth: number
): number => {
  return graphWidth < GRAPH_WIDTH_BREAKPOINT
    ? GRAPH_Y_AXIS_NARROW_WIDTH
    : baseYAxisWidth
}

export const layersWithLabels = <T,>(
  orientation: 'vertical' | 'horizontal',
  formatter: (data: ComputedDatum<T>) => string,
  labelLayerOnly: boolean = false
): BarLayer<T>[] => {
  const labelLayer: BarLayer<T> = ({ bars }) => {
    return (
      <g>
        {bars.map((bar) => {
          const { width, y, data, x, height } = bar
          const translateX =
            orientation === 'vertical' ? x + width / 2 : width + 5
          const translateY =
            orientation === 'vertical' ? y - 10 : y + height / 2
          return (
            <text
              transform={`translate(${translateX}, ${translateY})`}
              textAnchor={orientation === 'vertical' ? 'middle' : 'start'}
              dominantBaseline="central"
              fill={Color(bar.color).darken(0.3).hex()}
              fontSize="15px"
            >
              {formatter(data)}
            </text>
          )
        })}
      </g>
    )
  }

  if (labelLayerOnly) return [labelLayer]

  return [
    'grid',
    'axes',
    'bars',
    'markers',
    'legends',
    'annotations',
    labelLayer,
  ]
}
