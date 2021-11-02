import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { ComparisonRawData } from '../@types/DataTypes'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { labelValue } from './labels'
import {
  GRAPH_DEFAULT_WIDTH,
  NIVO_BASE_PROPS,
  processDataForGraph,
  yAxisWidthForSize,
} from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

import './Graphs.scss'

interface Props {
  data: ComparisonRawData[]
  dataDictionary: DataDictionaryEntry[]
  ministry?: string | null
  title: string
}

const LEFT_MARGIN = 160
const MARGINS = { left: LEFT_MARGIN, right: 50, top: 0, bottom: 50 }

const ComparisonGraph = ({
  data,
  dataDictionary,
  ministry,
  title,
}: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<ComparisonRawData>[] = [
    {
      key: 'Employees_BCPS',
      label: `${displayNameByKey('Ministry_Key', ministry)}`,
      color: '#6c757d',
    },
    {
      key: 'Available_Workforce_BCPS',
      label: 'Available Workforce',
      color: '#70CCDB',
      // tooltip: getTooltip('comparison-available-workforce', year),
    },
    {
      key: 'Employees_BC_Population',
      label: 'BC Population',
      color: '#D2E2EE',
      // tooltip: getTooltip('comparison-bc-population', year),
    },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  MARGINS.left = yAxisWidthForSize(width, LEFT_MARGIN)

  if (!data) return <div>&nbsp;</div>

  const { dataKeys, filteredData } = processDataForGraph(data, dataDefinitions)
  filteredData.reverse()

  const { labelCallback, items, axisLeft, axisBottom, tooltip } = useGraph({
    bottomAxisText: '% representation',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d: FixTypeLater) => formatPercent(d, 1, 100),
    margins: MARGINS,
    width,
  })

  const graph = (
    <ResponsiveBar
      axisBottom={axisBottom}
      axisLeft={axisLeft}
      colors={['#6c757d', '#70CCDB', '#D2E2EE']}
      data={filteredData}
      keys={dataKeys}
      label={labelValue}
      labelFormat={labelCallback()}
      margin={MARGINS}
      tooltip={tooltip}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = (
    <Legend items={dataDefinitions} dataDictionary={dataDictionary} />
  )

  return (
    <GraphFrame
      className="Comparison"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default ComparisonGraph
