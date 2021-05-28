import { BarSvgProps } from '@nivo/bar'

import { parseFloatClean } from './formatter'
import FixTypeLater from '../@types/FixTypeLater'
import { DataDefinition } from '../@types/DataDefinition'
import { DesignatedGroupKeyedData } from '../@types/DataTypes'

export const BAR_H_GAP_SIZE = 3 // Horizontal space between bars within a group
export const BAR_H_CATEGORY_GAP_SIZE = 30 // Horizontal space between bar groups

export const BAR_V_GAP_SIZE = 2 // Vertical space between bars within a group
export const BAR_V_CATEGORY_GAP_SIZE = 15 // Vertical space between bar groups

export const CHART_FONT = `BCSans, "myriad-pro", "Myriad Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`

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

export const NIVO_BASE_PROPS: Partial<BarSvgProps> = {
  axisRight: null,
  axisTop: null,
  borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
  groupMode: 'grouped',
  indexBy: 'Des_Grp',
  indexScale: { type: 'band', round: true },
  innerPadding: 2,
  labelSkipHeight: 0,
  labelSkipWidth: 0,
  labelTextColor,
  layout: 'horizontal',
  motionDamping: 15,
  motionStiffness: 90,
  padding: 0.3,
  theme: NIVO_THEME,
  valueScale: { type: 'linear' },
  enableGridX: true,
  enableGridY: false,
}

export const processDataForGraph = <T extends DesignatedGroupKeyedData>(
  data: T[],
  dataDefinitions: DataDefinition<T>[],
  additionalMapping?: FixTypeLater
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
        obj[dataKey] = parseFloatClean((d[dataKey] as unknown) as number)
        obj[`${dataKey}_str`] = d[dataKey]
      })
      return obj
    })
  return { dataKeys, filteredData }
}

export const GRAPH_DEFAULT_WIDTH = 620
export const GRAPH_WIDTH_BREAKPOINT = 576
export const GRAPH_Y_AXIS_NARROW_WIDTH = 80

export const yAxisWidthForSize = (
  graphWidth: number,
  baseYAxisWidth: number
): number => {
  return graphWidth < GRAPH_WIDTH_BREAKPOINT
    ? GRAPH_Y_AXIS_NARROW_WIDTH
    : baseYAxisWidth
}
