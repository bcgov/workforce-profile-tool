import { BarProps, BarSvgProps } from '@nivo/bar'
import FixTypeLater from '../@types/FixTypeLater'
import { parseFloatClean } from './formatter'

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

export const processDataForGraph = (
  data: FixTypeLater[],
  dataDefinitions: FixTypeLater[],
  additionalMapping?: FixTypeLater
): FixTypeLater => {
  const dataKeys = dataDefinitions.map((d) => d.key)
  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d: FixTypeLater) => {
      const obj: FixTypeLater = { Des_Grp: d.Des_Grp }
      if (additionalMapping) {
        additionalMapping(d, obj)
      }
      dataKeys.forEach((dataKey) => {
        obj[dataKey] = parseFloatClean(d[dataKey])
        obj[`${dataKey}_str`] = d[dataKey]
      })
      return obj
    })
  return { dataKeys, filteredData }
}

export const DEFAULT_GRAPH_WIDTH = 620
