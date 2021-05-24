import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'
import Color from 'color'

import {
  displayNameByKey,
  shortDisplayNameByKey,
  useDataManager,
} from '../Data/DataManager'
import { formatNumber } from '../Helpers/formatter'
import { labelValue } from './labels'
import {
  DEFAULT_GRAPH_WIDTH,
  NIVO_BASE_PROPS,
  processDataForGraph,
} from '../Helpers/graphs'
import { getTooltip } from '../Helpers/tooltipHelper'
import { OccupationRegionRawData } from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

import './Graphs.scss'

interface Props {
  title: string
  data: OccupationRegionRawData[]
  organization: string[] | string | null | undefined
}

const MARGINS = {
  left: 160,
  right: 55,
  top: 0,
  bottom: 50,
}

const OccupationRegionGraph = ({
  data,
  title,
  organization,
}: Props): JSX.Element => {
  const { year = '' } = useDataManager()

  const dataDefinitions = [
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

  const [width, setWidth] = useState(DEFAULT_GRAPH_WIDTH)

  MARGINS.left = width < 576 ? 80 : 160

  if (!data) return <div>&nbsp;</div>

  const semiFilteredData = data.filter(
    (d: FixTypeLater) => d.Variable_Type === 'Total'
  )

  const { dataKeys, filteredData } = processDataForGraph(
    semiFilteredData,
    dataDefinitions
  )
  filteredData.reverse()

  const { labelCallback, items } = useGraph({
    data: filteredData,
    dataKeys,
    width,
    formatter: (d: FixTypeLater) => formatNumber(d, ''),
    margins: MARGINS,
  })

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={dataKeys}
      indexBy="Des_Grp"
      margin={MARGINS}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#70CCDB', '#D2E2EE', '#6c757d']}
      layout={'horizontal'}
      groupMode={'grouped'}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      enableGridX={true}
      enableGridY={false}
      innerPadding={2}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) =>
          (width < 576
            ? shortDisplayNameByKey('Des_Grp', d)
            : displayNameByKey('Des_Grp', d)) as string,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `Count in ${displayNameByKey('Ministry_Key', organization)}`,
        legendPosition: 'middle',
        legendOffset: 40,
        tickValues: undefined,
        format: (d) => {
          if (isNaN(+d) || d === 0) return 0
          return `${(+d).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`
        },
      }}
      labelFormat={labelCallback()}
      label={labelValue}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {displayNameByKey('Des_Grp', d.indexValue)},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {formatNumber(d.data[d.id])}
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = <Legend items={dataDefinitions} />

  return (
    <GraphFrame
      items={items}
      className="Occupation"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default OccupationRegionGraph
