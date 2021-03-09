import * as R from 'recharts'
import React from 'react'

import { formatDesGrpTick, formatPercent } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  title: string
}

const ProgressGraph = ({ title }: Props): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => d['Des_Grp'] !== 'AS_TOTAL')

  const graph = (
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={filteredData}
        margin={{ left: 30, bottom: 15, right: 10, top: 10 }}
        barCategoryGap={15}
        barGap={2}
      >
        <R.XAxis
          dataKey="Des_Grp"
          type="category"
          tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
        />
        <R.YAxis
          type="number"
          interval={0}
          label={
            <R.Text angle={-90} x={50} y={260}>
              % representation
            </R.Text>
          }
        />
        <R.Tooltip />
        {LabelledBar({
          dataKey: '2015_pc',
          fill: '#70CCDB',
          formatter: (d) => formatPercent(d, 1, 100),
          position: 'top',
        })}
        {LabelledBar({
          dataKey: '2018_pc',
          fill: '#D2E2EE',
          formatter: (d) => formatPercent(d, 1, 100),
          position: 'top',
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legend = (
    <Legend
      items={[
        { label: '2015', color: '#70CCDB' },
        { label: '2018', color: '#D2E2EE' },
      ]}
    />
  )

  return (
    <GraphFrame
      className="Progress"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default ProgressGraph
