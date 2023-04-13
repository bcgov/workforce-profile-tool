import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  GRAPH_Y_AXIS_NARROW_WIDTH,
  NIVO_BASE_PROPS,
  layersWithLabels,
  processDataForGraph,
} from '../Helpers/graphs'
import { formatPercent } from '../Helpers/formatter'
import { labelValue } from './labels'
import { LeadershipRawData } from '../@types/DataTypes'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

import './Graphs.scss'

interface Props {
  data: LeadershipRawData[]
  dataDictionary: DataDictionaryEntry[]
  title: string
}

const LEFT_MARGIN = 160
const MARGINS = { left: LEFT_MARGIN, right: 50, top: 0, bottom: 50 }

const LeadershipGraph = ({
  data,
  dataDictionary,
  title,
}: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<LeadershipRawData>[] = [
    {
      key: 'Executive',
      label: 'Executive Leadership',
      color: '#70CCDB',
    },
    {
      key: 'Management_Band',
      label: 'Management Band Leadership',
      color: '#D2E2EE',
    },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  MARGINS.left =
    width < GRAPH_WIDTH_BREAKPOINT ? GRAPH_Y_AXIS_NARROW_WIDTH : LEFT_MARGIN

  const { dataKeys, filteredData } = processDataForGraph(data, dataDefinitions)
  filteredData.reverse()

  const { labelCallback, items, axisLeft, axisBottom, tooltip } = useGraph({
    bottomAxisText: '% in leadership positions',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => formatPercent(d, 1, 100),
    margins: MARGINS,
    width,
  })

  if (!data) return <div>&nbsp;</div>

  const graph = (
    <ResponsiveBar
      axisBottom={axisBottom}
      axisLeft={axisLeft}
      colors={['#70CCDB', '#D2E2EE']}
      data={filteredData}
      keys={dataKeys}
      label={labelValue}
      labelFormat={labelCallback()}
      margin={MARGINS}
      tooltip={tooltip}
      {...NIVO_BASE_PROPS}
      layers={layersWithLabels<typeof filteredData[0]>('horizontal', (d) =>
        formatPercent(labelValue(d), 1, 100)
      )}
    />
  )

  const legend = (
    <Legend items={dataDefinitions} dataDictionary={dataDictionary} />
  )

  return (
    <GraphFrame
      className="Leadership"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default LeadershipGraph
