import * as R from 'recharts'
import React from 'react'

import { formatDesGrpTick, formatNumber } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  title: string
}

const HiringGraph = ({ title }: Props): JSX.Element => {
  const dataDefinitions = [
    { key: '2020_hired_ct', label: 'Hired, 2015 to 2018', color: '#70CCDB' },
  ]

  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => !['WOM_SM'].includes(d['Des_Grp']))

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
          tickFormatter={(d) => formatNumber(d)}
          label={
            <R.Text angle={-90} x={30} y={260}>
              Count
            </R.Text>
          }
        />
        <R.Tooltip />
        {LabelledBar({
          dataKey: '2020_hired_ct',
          fill: '#70CCDB',
          formatter: (d) => formatNumber(d, 1),
          position: 'top',
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  return (
    <GraphFrame
      className="Hiring"
      title={title}
      graph={graph}
      legend={<Legend items={dataDefinitions} />}
    />
  )
}

export default HiringGraph
