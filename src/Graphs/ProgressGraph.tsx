import * as R from 'recharts'
import React from 'react'

import { BAR_H_CATEGORY_GAP_SIZE, BAR_H_GAP_SIZE } from '../Helpers/graphs'
import { formatDesGrpTick, formatPercent } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import FixTypeLater from '../@types/FixTypeLater'
import CustomTooltip from './CustomTooltip'
import { VARIABLES } from '../Variables/VariableManager'

// TODO: Factor this out
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
        barCategoryGap={BAR_H_CATEGORY_GAP_SIZE}
        barGap={BAR_H_GAP_SIZE}
      >
        <R.XAxis
          dataKey="Des_Grp"
          type="category"
          tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
        />
        <R.YAxis
          type="number"
          interval={0}
          tickFormatter={(d) => formatPercent(d, 0, 100)}
          label={
            <R.Text angle={-90} x={40} y={260}>
              % representation
            </R.Text>
          }
        />
        <R.Tooltip
          content={<CustomTooltip />}
          labelFormatter={(d: FixTypeLater): FixTypeLater => {
            const label = VARIABLES.displayNameByKey('Des_Grp', d)
            if (label) return label
            return d === '2018_pc' ? '2018' : '2020'
          }}
        />
        {LabelledBar({
          dataKey: '2018_pc',
          fill: '#70CCDB',
          formatter: (d) => formatPercent(d, 1, 100),
          position: 'top',
        })}
        {LabelledBar({
          dataKey: '2020_pc',
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
        { label: '2018', color: '#70CCDB' },
        { label: '2020', color: '#D2E2EE' },
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
