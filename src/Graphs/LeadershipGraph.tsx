import * as R from 'recharts'
import React from 'react'

import { formatDesGrpTick, formatPercent } from '../Helpers/formatter'
import { ticks } from '../Helpers/scales'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import { VARIABLES } from '../Variables/VariableManager'
import { BAR_V_CATEGORY_GAP_SIZE, BAR_V_GAP_SIZE } from '../Helpers/graphs'

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
        margin={{ left: 30, bottom: 15, right: 15 }}
        barCategoryGap={BAR_V_CATEGORY_GAP_SIZE}
        barGap={BAR_V_GAP_SIZE}
      >
        <R.XAxis
          type="number"
          ticks={tickArray}
          interval={0}
          tickFormatter={(d) => formatPercent(d, 0, 100)}
        >
          <R.Label offset={-10} position={'insideBottom'}>
            % in leadership positions
          </R.Label>
        </R.XAxis>
        <R.YAxis
          dataKey="Des_Grp"
          type="category"
          tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
        />
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
