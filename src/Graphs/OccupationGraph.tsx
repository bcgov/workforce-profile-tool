import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'
import Color from 'color'

import { formatNumber } from '../Helpers/formatter'
import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'
import { OccupationRegionRawData } from '../@types/DataTypes'

interface Props {
  title: string
  data: OccupationRegionRawData[]
}

const LEFT_MARGIN = 160
const RIGHT_MARGIN = 55
const TOP_MARGIN = 0
const BOTTOM_MARGIN = 50

const OccupationGraph = ({ data, title }: Props): JSX.Element => {
  const dataDefinitions = [
    { key: 'DesGrp_Count_Expected', label: 'Expected', color: '#70CCDB' },
    { key: 'DesGrp_Count_ORG', label: 'Actual', color: '#D2E2EE' },
    { key: 'DesGrp_Count_Shortfall', label: 'Shortfall', color: '#6c757d' },
  ]

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const filteredData = data
    .filter((d) => d.Variable_Type === 'Total')
    .sort((a, b) => b['Des_Grp'].localeCompare(a['Des_Grp']))

  const items = filteredData
    .map((d): number[] => {
      return [
        'DesGrp_Count_Expected',
        'DesGrp_Count_ORG',
        'DesGrp_Count_Shortfall',
      ].map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={[
        'DesGrp_Count_Expected',
        'DesGrp_Count_ORG',
        'DesGrp_Count_Shortfall',
      ]}
      indexBy="Des_Grp"
      margin={{
        top: TOP_MARGIN,
        right: RIGHT_MARGIN,
        bottom: BOTTOM_MARGIN,
        left: LEFT_MARGIN,
      }}
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
          VARIABLES.displayNameByKey('Des_Grp', d) as string,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Count in BCPS',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      }}
      labelFormat={(d): FixTypeLater => {
        const numD = isNaN(+d) ? 0 : +d
        return ((
          <tspan
            dy={0}
            dx={`${3 + (numD * (width - 240)) / 2 / maxItem}`}
            style={{ textAnchor: 'start' }}
          >
            {formatNumber(d)}
          </tspan>
        ) as unknown) as string
      }}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)},{' '}
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
      className="Occupation"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default OccupationGraph
