import React, { Component } from 'react'
import * as R from 'recharts'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.scss'

import { formatPercent } from '../Services/formatter'

import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import LabelledBar from './LabelledBar'

interface Props {
  title: string
}

const ProgressGraph = ({ title }: Props): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => d['Des_Grp'] !== 'AS_TOTAL')

  // const chartData = filteredData.map((d) => {
  //   const values = [d['2015_pc'], d['2018_pc']]
  //   const key = d['Des_Grp']

  //   let title
  //   try {
  //     title = VARIABLES.displayNameByKey('Des_Grp', key)
  //   } catch (e) {
  //     if (key === 'WOM_SM') title = 'Women in Senior Mgmt'
  //   }

  //   return {
  //     category: title,
  //     values,
  //   }
  // })

  console.log('filteredData', filteredData)
  // console.log('chartData', chartData)

  // const graph = (
  //   <PlusPlot.GroupedColumnChart
  //     data={chartData}
  //     colors={['#70CCDB', '#D2E2EE', '#6c757d']}
  //     options={{
  //       height: 500,
  //       dataLabels: {
  //         position: -10,
  //         formatter: (d: FixTypeLater) => formatPercent(d, 1, 100),
  //       },
  //       margins: { top: 20, left: 50, bottom: 40, right: 20 },
  //       axes: { xAxisLabel: '', yAxisLabel: '% representation' },
  //       font: '"myriad-pro", "Myriad Pro"',
  //     }}
  //   />
  // )

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
          dataKey: '2015_pc',
          fill: '#70CCDB',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
        {LabelledBar({
          dataKey: '2018_pc',
          fill: '#D2E2EE',
          formatter: (d) => formatPercent(d, 1, 100),
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
