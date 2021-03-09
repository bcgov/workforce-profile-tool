import React from 'react'
import * as R from 'recharts'

import { formatPercent } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  ministry?: string | null
  title: string
}

const ComparisonGraph = ({ ministry, title }: Props): JSX.Element => {
  const { comparisonData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const chartData = data.map((d) => {
    const count = d.Employees_BCPS
    const comparators = [
      { value: +d.Available_Workforce_BCPS, color: '#70CCDB' },
      { value: +d.Employees_BC_Population, color: '#D2E2EE' },
    ]

    return {
      category: VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']),
      color: '#6c757d',
      count,
      comparators,
    }
  })

  const filteredData = data

  // const graph = (
  //   <PlusPlot.BulletBarChart
  //     data={chartData}
  //     options={{
  //       height: 500,
  //       dataLabels: {
  //         position: 25,
  //         formatter: (d: string) => formatPercent(d, 1, 100),
  //       },
  //       margins: { top: 0, left: 140, bottom: 40, right: 40 },
  //       axes: { yAxisLabel: '', xAxisLabel: '% representation' },
  //       font: '"myriad-pro", "Myriad Pro"',
  //     }}
  //     xLines={[]}
  //   />
  // )

  const graph = (
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={filteredData}
        layout="vertical"
        margin={{ left: 30, bottom: 15, right: 10 }}
        barCategoryGap={15}
        barGap={2}
      >
        <R.XAxis type="number" interval={0}>
          <R.Label offset={-10} position={'insideBottom'}>
            % representation
          </R.Label>
        </R.XAxis>
        <R.YAxis dataKey="Des_Grp" type="category" />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'Employees_BCPS',
          fill: '#6c757d',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
        {LabelledBar({
          dataKey: 'Available_Workforce_BCPS',
          fill: '#70CCDB',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
        {LabelledBar({
          dataKey: 'Employees_BC_Population',
          fill: '#D2E2EE',
          formatter: (d) => formatPercent(d, 1, 100),
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legend = (
    <Legend
      items={[
        { label: `${ministry}`, color: '#6c757d' },
        {
          label: 'Available Workforce',
          color: '#70CCDB',
          tooltip: `The representation of the target group in the BC Workforce according to Statistics Canada's 2011 National Household Survey The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Organization, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Organization.`,
        },
        {
          label: 'BC Population',
          color: '#D2E2EE',
          tooltip: `Statistics Canada, 2011 National Household Survey`,
        },
      ]}
    />
  )

  return (
    <GraphFrame
      className="Comparison"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default ComparisonGraph
