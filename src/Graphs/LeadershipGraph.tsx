import * as R from 'recharts'
import React from 'react'

import { formatPercent } from '../Services/formatter'
import { ticks } from '../Services/scales'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'

interface TitleProps {
  title: string
}

const LeadershipGraph = ({ title }: TitleProps): JSX.Element => {
  const { leadershipData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const tickArray: number[] = ticks(data, ['Executive', 'Management_Band'])

  console.log('tickArray', tickArray)

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
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={data}
        layout="vertical"
        margin={{ left: 30, bottom: 15, right: 10 }}
        barCategoryGap={15}
        barGap={2}
      >
        <R.XAxis type="number" ticks={tickArray} interval={0}>
          <R.Label offset={-10} position={'insideBottom'}>
            % in leadership positions
          </R.Label>
        </R.XAxis>
        <R.YAxis dataKey="Des_Grp" type="category" />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'Executive',
          fill: '#70CCDB',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
        {LabelledBar({
          dataKey: 'Management_Band',
          fill: '#D2E2EE',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  return (
    <GraphFrame
      className="Leadership"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default LeadershipGraph
