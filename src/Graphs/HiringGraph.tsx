import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  NIVO_BASE_PROPS,
  processDataForGraph,
} from '../Helpers/graphs'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import {
  formatNumber,
  formatPercent,
  parseFloatClean,
} from '../Helpers/formatter'
import { labelValue } from './labels'
import { HiringRawData, ProgressRawData } from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'
import { DataDictionaryEntry } from '../Data/useDataQuery'

interface Props {
  data: HiringRawData[]
  dataDictionary: DataDictionaryEntry[]
  title: string
}

const MARGINS = { top: 50, right: 30, bottom: 50, left: 80 }

const HiringGraph = ({ data, dataDictionary, title }: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<HiringRawData>[] = [
    { key: 'DesGrp_Count_ORG', label: 'Hired', color: '#70CCDB' },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  if (!data) return <div>&nbsp;</div>

  const { dataKeys, filteredData } = processDataForGraph(data, dataDefinitions)

  const { labelCallback, items, tooltip } = useGraph({
    bottomAxisText: '% representation',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => formatNumber(d),
    labelIsVertical: true,
    margins: MARGINS,
    width: 500,
  })

  const graph = (
    <ResponsiveBar
      axisBottom={{
        format: (d) =>
          (width < GRAPH_WIDTH_BREAKPOINT
            ? shortDisplayNameByKey('Des_Grp', d as string)
            : displayNameByKey('Des_Grp', d as string)) as string,
        legendOffset: 32,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      axisLeft={{
        format: (d) => formatNumber(+d),
        legend: 'Count',
        legendOffset: -60,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      colors={dataKeys.map(
        (dataKey) =>
          dataDefinitions.find((dd) => dd.key === dataKey)?.color || ''
      )}
      data={filteredData}
      keys={dataKeys}
      label={labelValue}
      labelFormat={labelCallback()}
      margin={MARGINS}
      tooltip={tooltip}
      {...NIVO_BASE_PROPS}
      // Override NIVO_BASE_PROPS; these MUST come after the line above
      layout={'vertical'}
      enableGridX={false}
      enableGridY={true}
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
      className="Progress"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default HiringGraph
