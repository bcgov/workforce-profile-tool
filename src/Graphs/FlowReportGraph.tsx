import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { FlowRawData } from '../@types/DataTypes'
import {
  formatNumber,
  formatPercent,
  parseFloatClean,
} from '../Helpers/formatter'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  GRAPH_Y_AXIS_NARROW_WIDTH,
  NIVO_BASE_PROPS,
  processDataForGraph,
} from '../Helpers/graphs'
import { labelValue } from './labels'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'
import Color from 'color'

const COLOR_MAP = {
  Hiring: {
    DesGrp_Count_ORG: '#70CCDB',
    NonDesGrp_Count_ORG: '#D2E2EE',
  },
  Separations: {
    DesGrp_Count_ORG: 'rgb(234, 107, 86)',
    NonDesGrp_Count_ORG: 'rgb(255, 157, 136)',
  },
  Promotions: {
    DesGrp_Count_ORG: 'rgb(230, 179, 69)',
    NonDesGrp_Count_ORG: 'rgb(255, 229, 119)',
  },
}

interface Props {
  data: FlowRawData[]
  dataDictionary: DataDictionaryEntry[]
  title: string
}

const LEFT_MARGIN = 300
const MARGINS = { left: LEFT_MARGIN, right: 50, top: 0, bottom: 50 }

const FlowReportGraph = ({
  data,
  dataDictionary,
  title,
}: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<FlowRawData>[] = [
    { key: 'DesGrp_Count_ORG', label: 'Designated Group', color: '#666' },
    {
      key: 'NonDesGrp_Count_ORG',
      label: 'Non-Designated Group',
      color: '#ccc',
    },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  MARGINS.left =
    width < GRAPH_WIDTH_BREAKPOINT ? GRAPH_Y_AXIS_NARROW_WIDTH : LEFT_MARGIN

  if (!data) return <div>&nbsp;</div>

  // const reshapedData = data

  const { dataKeys, filteredData } = processDataForGraph(
    data,
    dataDefinitions,
    (d: FixTypeLater, obj: FixTypeLater) => {
      obj.VariableType = d.Variable_Type
      obj.DisplayType = d.Display_Type
      obj.Category = `${d.Display_Type}`
    }
  )
  filteredData.reverse()

  const { labelCallback, items } = useGraph({
    bottomAxisText: 'Count',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => formatNumber(d),
    margins: MARGINS,
    width,
  })

  // const graph = (
  //   <ResponsiveBar
  //     axisBottom={axisBottom}
  //     axisLeft={axisLeft}
  //     colors={['#6c757d', '#70CCDB', '#D2E2EE']}
  //     data={filteredData}
  //     keys={dataKeys}
  //     label={labelValue}
  //     labelFormat={labelCallback()}
  //     margin={MARGINS}
  //     tooltip={tooltip}
  //     // Override NIVO_BASE_PROPS; these MUST come after the line above
  //     indexBy={'Category'}
  //     enableGridX={false}
  //     enableGridY={true}
  //   />
  const graph = (
    <ResponsiveBar
      axisBottom={{
        format: (d) => formatNumber(+d),
        legend: 'Count',
        legendOffset: 40,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      axisLeft={{
        legendOffset: 32,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      colors={(bar) => {
        return (COLOR_MAP as FixTypeLater)[bar.data.VariableType][bar.id]
      }}
      data={filteredData}
      keys={dataKeys}
      label={labelValue}
      labelFormat={labelCallback()}
      margin={MARGINS}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {d.indexValue},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {formatNumber(d.data[d.id])}
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
      indexBy={'Category'}
    />
  )

  const legend = (
    <Legend
      items={dataDefinitions.filter((dd) => dataKeys.includes(dd.key))}
      dataDictionary={dataDictionary}
    />
  )

  return (
    <GraphFrame
      className="FlowReport"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default FlowReportGraph
