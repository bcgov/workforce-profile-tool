import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import { formatNumber, formatPercent } from '../Services/formatter'
import Legend from './Legend'
import GraphFrame from './GraphFrame'
import * as R from 'recharts'

import './Graphs.scss'

import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import LabelledBar from './LabelledBar'

interface Props {
  title: string
}

const HiringGraph = ({ title }: Props): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => !['WOM_SM'].includes(d['Des_Grp']))

  // const chartData = data.map((d) => {
  //   return {
  //     category: VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']),
  //     count: d['2018_hired_ct'],
  //     color: '#70CCDB',
  //   }
  // })

  // const graph = (
  //   <PlusPlot.ColumnChart
  //     data={chartData}
  //     yLines={[]}
  //     options={{
  //       height: 500,
  //       dataLabels: {
  //         position: -10,
  //         formatter: (d: FixTypeLater) => formatNumber(d),
  //       },
  //       margins: { top: 10, left: 60, bottom: 40, right: 20 },
  //       axes: { xAxisLabel: '', yAxisLabel: 'Count' },
  //       font: '"myriad-pro", "Myriad Pro"',
  //     }}
  //   />
  // )

  console.log('--< filteredData', filteredData)

  const graph = (
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={filteredData}
        margin={{ left: 30, bottom: 15, right: 10 }}
        barCategoryGap={15}
        barGap={2}
      >
        <R.XAxis dataKey="Des_Grp" type="category"></R.XAxis>
        <R.YAxis type="number" interval={0}>
          <R.Label offset={-10} position={'insideBottom'}>
            % representation
          </R.Label>
        </R.YAxis>
        <R.Tooltip />
        {LabelledBar({
          dataKey: '2018_hired_ct',
          fill: '#70CCDB',
          formatter: (d) => formatNumber(d, 1),
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legend = (
    <Legend items={[{ label: 'Hired, 2015 to 2018', color: '#70CCDB' }]} />
  )

  return (
    <GraphFrame
      className="Hiring"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default HiringGraph
