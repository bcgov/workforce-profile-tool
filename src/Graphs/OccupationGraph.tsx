import * as R from 'recharts'
import React from 'react'

import { formatDesGrpTick, formatNumber } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import { VARIABLES } from '../Variables/VariableManager'

interface Props {
  title: string
}

const OccupationGraph = ({ title }: Props): JSX.Element => {
  const { occupationRegionData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => d.Variable_Type === 'Total')

  const graph = (
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={filteredData}
        layout="vertical"
        margin={{ left: 30, bottom: 15, right: 20 }}
        barCategoryGap={15}
        barGap={2}
      >
        <R.XAxis
          type="number"
          interval={0}
          tickFormatter={(d) => formatNumber(d)}
        >
          <R.Label offset={-10} position={'insideBottom'}>
            Count in BCPS {/* TODO: Fix this? Should it be ministryName? */}
          </R.Label>
        </R.XAxis>
        <R.YAxis
          dataKey="Des_Grp"
          type="category"
          tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
        />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'DesGrp_Count_Expected',
          fill: '#70CCDB',
          formatter: (d) => formatNumber(d, ''),
        })}
        {LabelledBar({
          dataKey: 'DesGrp_Count_ORG',
          fill: '#D2E2EE',
          formatter: (d) => formatNumber(d, ''),
        })}
        {LabelledBar({
          dataKey: 'DesGrp_Count_Shortfall',
          fill: '#6c757d',
          formatter: (d) => formatNumber(d, ''),
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legend = (
    <Legend
      items={[
        { label: 'Expected', color: '#70CCDB' },
        { label: 'Actual', color: '#D2E2EE' },
        { label: 'Shortfall', color: '#6c757d' },
      ]}
    />
  )

  return (
    <GraphFrame
      className="Occupation"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default OccupationGraph
