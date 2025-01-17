import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  NIVO_BASE_PROPS,
  layersWithLabels,
  processDataForGraph,
} from '../Helpers/graphs'
import { HiringRawData } from '../@types/DataTypes'
import { labelValue } from './labels'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

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

  const newData = data.map((d) => {
    const newD = { ...d }
    newD.DesGrp_Count_ORG = formatPercent(
      d.DesGrp_Count_ORG,
      1,
      +d.Total_Count_ORG
    )
    return newD
  })

  var { dataKeys, filteredData } = processDataForGraph(newData, dataDefinitions)

  const { labelCallback, items, tooltip } = useGraph({
    bottomAxisText: '% representation',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => formatPercent(d, 1, 100),
    labelIsVertical: true,
    margins: MARGINS,
    width: 500,
  })

  if (!data) return <div>&nbsp;</div>

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
        format: (d) => `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
        legend: '% representation',
        legendOffset: -50,
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
      layers={layersWithLabels<typeof filteredData[0]>('vertical', (d) =>
        labelValue(d)
      )}
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
      className="Hiring"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default HiringGraph
