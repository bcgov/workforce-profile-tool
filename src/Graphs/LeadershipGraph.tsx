import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useState } from 'react'

import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'

interface TitleProps {
  title: string
}

const LEFT_MARGIN = 140
const RIGHT_MARGIN = 40
const TOP_MARGIN = 0
const BOTTOM_MARGIN = 50

const LeadershipGraph = ({ title }: TitleProps): JSX.Element => {
  const dataDefinitions = [
    {
      key: 'Executive',
      label: 'Executive Leadership',
      color: '#70CCDB',
      tooltip: `Executive Leadership includes all positions classified as Assistant Deputy Minister and Deputy Minister.`,
    },
    {
      key: 'Management_Band',
      label: 'Management Band Leadership',
      color: '#D2E2EE',
      tooltip: `Management Band Leadership includes all positions classified as Band 1 through 6, and those classified as Applied Leadership, Business Leadership, and Strategic Leadership. Order in Council (OIC) appointments within these classifications is also included.`,
    },
  ]

  const { leadershipData: data } = useDataManager()

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const items = data
    .map((d): number[] => {
      return ['Executive', 'Management_Band'].map(
        (e: string): number => +(d as FixTypeLater)[e]
      )
    })
    .flat()

  const sortedData = data.sort((a, b) =>
    b['Des_Grp'].localeCompare(a['Des_Grp'])
  )

  const maxItem = Math.max(...items)

  const legend = <Legend items={dataDefinitions} />

  const graph = (
    <ResponsiveBar
      data={sortedData}
      keys={['Executive', 'Management_Band']}
      indexBy="Des_Grp"
      margin={{
        top: TOP_MARGIN,
        right: RIGHT_MARGIN,
        bottom: BOTTOM_MARGIN,
        left: LEFT_MARGIN,
      }}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#70CCDB', '#D2E2EE']}
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
        legend: '% in leadership positions',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
      }}
      labelFormat={(d): FixTypeLater => {
        const numD = +d
        return ((
          <tspan
            dy={0}
            // dx={-numD + 5 + numD * ((width - 180 - 30) / maxItem)}
            // dx={numD * ((width - 180 - 30) / maxItem)}
            dx={`${5 + (numD * (width - 210)) / 2 / maxItem}`}
            style={{ textAnchor: 'start' }}
          >
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

  return (
    <GraphFrame
      className="Leadership"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default LeadershipGraph
