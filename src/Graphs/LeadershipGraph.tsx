import * as R from 'recharts'
import React, { useState } from 'react'

import { formatDesGrpTick, formatPercent } from '../Helpers/formatter'
import { ticks } from '../Helpers/scales'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import { VARIABLES } from '../Variables/VariableManager'
import {
  BAR_V_CATEGORY_GAP_SIZE,
  BAR_V_GAP_SIZE,
  NIVO_BASE_PROPS,
} from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import { ResponsiveBar } from '@nivo/bar'

interface TitleProps {
  title: string
}

const LEFT_MARGIN = 140
const RIGHT_MARGIN = 40
const TOP_MARGIN = 50
const BOTTOM_MARGIN = 50

const LeadershipGraph = ({ title }: TitleProps): JSX.Element => {
  const { leadershipData: data } = useDataManager()

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const tickArray: number[] = ticks(data, ['Executive', 'Management_Band'])

  console.log('tickArray', tickArray)

  const items = data
    .map((d): number[] => {
      return ['Executive', 'Management_Band'].map(
        (e: string): number => +(d as FixTypeLater)[e]
      )
    })
    .flat()

  const maxItem = Math.max(...items)

  const legend = (
    <Legend
      items={[
        {
          label: 'Executive Leadership',
          color: '#70CCDB',
          tooltip: `Executive Leadership includes all positions classified as Assistant Deputy Minister and Deputy Minister.`,
        },
        {
          label: 'Management Band Leadership',
          color: '#D2E2EE',
          tooltip: `Management Band Leadership includes all positions classified as Band 1 through 6, and those classified as Applied Leadership, Business Leadership, and Strategic Leadership. Order in Council (OIC) appointments within these classifications is also included.`,
        },
      ]}
    />
  )

  const graph = (
    <ResponsiveBar
      data={data}
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
          <div style={{ color: d.color }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)}, {d.id}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  // const graph = (
  //   <R.ResponsiveContainer width="100%" height={500}>
  //     <R.BarChart
  //       data={data}
  //       layout="vertical"
  //       margin={{ left: 30, bottom: 15, right: 15 }}
  //       barCategoryGap={BAR_V_CATEGORY_GAP_SIZE}
  //       barGap={BAR_V_GAP_SIZE}
  //     >
  //       <R.XAxis
  //         type="number"
  //         ticks={tickArray}
  //         interval={0}
  //         tickFormatter={(d) => formatPercent(d, 0, 100)}
  //       >
  //         <R.Label offset={-10} position={'insideBottom'}>
  //           % in leadership positions
  //         </R.Label>
  //       </R.XAxis>
  //       <R.YAxis
  //         dataKey="Des_Grp"
  //         type="category"
  //         tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
  //       />
  //       <R.Tooltip />
  //       {LabelledBar({
  //         dataKey: 'Executive',
  //         fill: '#70CCDB',
  //         formatter: (d) => formatPercent(d, 1, 100),
  //       })}
  //       {LabelledBar({
  //         dataKey: 'Management_Band',
  //         fill: '#D2E2EE',
  //         formatter: (d) => formatPercent(d, 1, 100),
  //       })}
  //     </R.BarChart>
  //   </R.ResponsiveContainer>
  // )

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
