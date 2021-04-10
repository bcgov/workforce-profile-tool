import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useState } from 'react'

import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { parseFloatClean } from '../Helpers/formatter'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'
import { getTooltip } from '../Data/tooltipHelper'
import { ComparisonRawData } from '../@types/DataTypes'

interface Props {
  data: ComparisonRawData[]
  ministry?: string | null
  title: string
  year: string
}

const LEFT_MARGIN = 160
const RIGHT_MARGIN = 50
const TOP_MARGIN = 0
const BOTTOM_MARGIN = 50

const ComparisonGraph = ({
  data,
  ministry,
  title,
  year,
}: Props): JSX.Element => {
  const dataDefinitions = [
    {
      key: 'Employees_BCPS',
      label: `${VARIABLES.displayNameByKey('Ministry_Key', ministry)}`,
      color: '#6c757d',
    },
    {
      key: 'Available_Workforce_BCPS',
      label: 'Available Workforce',
      color: '#70CCDB',
      tooltip: getTooltip('comparison-available-workforce', year),
    },
    {
      key: 'Employees_BC_Population',
      label: 'BC Population',
      color: '#D2E2EE',
      tooltip: getTooltip('comparison-bc-population', year),
    },
  ]

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d) => ({
      Des_Grp: d.Des_Grp,
      Employees_BCPS: parseFloatClean(d['Employees_BCPS']),
      Available_Workforce_BCPS: parseFloatClean(d['Available_Workforce_BCPS']),
      Employees_BC_Population: parseFloatClean(d['Employees_BC_Population']),
    }))
    .reverse()

  const items = filteredData
    .map((d): number[] => {
      return [
        'Employees_BCPS',
        'Available_Workforce_BCPS',
        'Employees_BC_Population',
      ].map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={[
        'Employees_BCPS',
        'Available_Workforce_BCPS',
        'Employees_BC_Population',
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
      colors={['#6c757d', '#70CCDB', '#D2E2EE']}
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
        legend: '% representation',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
      }}
      labelFormat={(d): FixTypeLater => {
        const numD = +d
        const dx = 5 + (numD * (width - 240)) / 2 / maxItem
        return ((
          <tspan dy={0} dx={dx} style={{ textAnchor: 'start' }}>
            {d === 0 && '<3'}
            {d > 0 && (
              <>{d.toLocaleString(undefined, { minimumFractionDigits: 1 })}%</>
            )}
          </tspan>
        ) as unknown) as string
      }}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = <Legend items={dataDefinitions} />

  return (
    <GraphFrame
      className="Comparison"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default ComparisonGraph
