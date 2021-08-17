import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import {
  GRAPH_DEFAULT_WIDTH,
  NIVO_BASE_PROPS,
  processDataForGraph,
  yAxisWidthForSize,
} from '../Helpers/graphs'
import { displayNameByKey } from '../Data/DataManager'
import { formatNumber } from '../Helpers/formatter'
import { labelValue } from './labels'
import { OccupationRegionRawData } from '../@types/DataTypes'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

import './Graphs.scss'

interface Props {
  data: OccupationRegionRawData[]
  dataDictionary: DataDictionaryEntry[]
  organization: string[] | string | null | undefined
  title: string
}

const LEFT_MARGIN = 160
const MARGINS = { left: LEFT_MARGIN, right: 55, top: 0, bottom: 50 }

const OccupationRegionGraph = ({
  data,
  dataDictionary,
  title,
  organization,
}: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<OccupationRegionRawData>[] = [
    {
      key: 'DesGrp_Count_Expected',
      label: 'Expected',
      color: '#70CCDB',
    },
    { key: 'DesGrp_Count_ORG', label: 'Actual', color: '#D2E2EE' },
    {
      key: 'DesGrp_Count_Shortfall',
      label: 'Shortfall',
      color: '#6c757d',
    },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  MARGINS.left = yAxisWidthForSize(width, LEFT_MARGIN)

  if (!data) return <div>&nbsp;</div>

  const semiFilteredData = data.filter(
    (d: OccupationRegionRawData) => d.Variable_Type === 'Total'
  )

  const { dataKeys, filteredData } = processDataForGraph(
    semiFilteredData,
    dataDefinitions
  )
  filteredData.reverse()

  const { labelCallback, items, axisLeft, axisBottom, tooltip } = useGraph({
    bottomAxisFormat: (d) => {
      if (isNaN(+d) || d === 0) return 0
      return `${(+d).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`
    },
    bottomAxisText: `Count in ${displayNameByKey(
      'Ministry_Key',
      organization
    )}`,
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => {
      console.log('d', d)
      return formatNumber(d, '')
    },
    margins: MARGINS,
    width,
  })

  const graph = (
    <ResponsiveBar
      axisBottom={axisBottom}
      axisLeft={axisLeft}
      colors={['#70CCDB', '#D2E2EE', '#6c757d']}
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
      className="Occupation"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default OccupationRegionGraph
