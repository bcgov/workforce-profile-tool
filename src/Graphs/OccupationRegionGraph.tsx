import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import {
  GRAPH_DEFAULT_WIDTH,
  NIVO_BASE_PROPS,
  processDataForGraph,
  yAxisWidthForSize,
} from '../Helpers/graphs'
import { displayNameByKey, useDataManager } from '../Data/DataManager'
import { formatNumber } from '../Helpers/formatter'
import { getTooltip } from '../Helpers/tooltipHelper'
import { labelValue } from './labels'
import { OccupationRegionRawData } from '../@types/DataTypes'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

import './Graphs.scss'
import { DataDefinition } from '../@types/DataDefinition'

interface Props {
  data: OccupationRegionRawData[]
  organization: string[] | string | null | undefined
  title: string
}

const LEFT_MARGIN = 160
const MARGINS = { left: LEFT_MARGIN, right: 55, top: 0, bottom: 50 }

const OccupationRegionGraph = ({
  data,
  title,
  organization,
}: Props): JSX.Element => {
  const { year = '' } = useDataManager()

  const dataDefinitions: DataDefinition<OccupationRegionRawData>[] = [
    {
      key: 'DesGrp_Count_Expected',
      label: 'Expected',
      color: '#70CCDB',
      tooltip: getTooltip('representation-expected', year),
    },
    { key: 'DesGrp_Count_ORG', label: 'Actual', color: '#D2E2EE' },
    {
      key: 'DesGrp_Count_Shortfall',
      label: 'Shortfall',
      color: '#6c757d',
      tooltip: getTooltip('representation-shortfall', year),
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

  const legend = <Legend items={dataDefinitions} />

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
