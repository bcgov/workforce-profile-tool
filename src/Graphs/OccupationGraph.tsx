import * as R from 'recharts'
import React from 'react'

import { formatNumber } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import Dictionary from '../@types/Dictionary'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  title: string
}

const OccupationGraph = ({ title }: Props): JSX.Element => {
  const { occupationRegionData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const dataMap: Dictionary<any> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const filteredData = data.filter((d) => d.Variable_Type === 'Total')

  // const filteredData = dat

  // const chartData = Object.keys(dataMap).map((k) => {
  //   const data = dataMap[k].filter(
  //     (d: FixTypeLater) => d.Variable_Type === 'Total'
  //   )[0]
  //   const values = [
  //     data.DesGrp_Count_Expected,
  //     data.DesGrp_Count_ORG,
  //     data.DesGrp_Count_Shortfall,
  //   ]

  //   const title = VARIABLES.displayNameByKey('Des_Grp', k)

  //   return {
  //     category: title,
  //     values,
  //   }
  // })

  // const graph = (
  //   <PlusPlot.GroupedBarChart
  //     data={chartData}
  //     colors={['#70CCDB', '#D2E2EE', '#6c757d']}
  //     options={{
  //       dataLabels: {
  //         position: 20,
  //         formatter: (d: FixTypeLater) => formatNumber(d, ''),
  //       },
  //       margins: { top: 0, left: 140, bottom: 40, right: 20 },
  //       axes: { yAxisLabel: '', xAxisLabel: 'Count in BCPS' },
  //       font: '"myriad-pro", "Myriad Pro"',
  //     }}
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
            % in leadership positions
          </R.Label>
        </R.XAxis>
        <R.YAxis dataKey="Des_Grp" type="category" />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'DesGrp_Count_Expected',
          fill: '#70CCDB',
          formatter: (d) => formatNumber(d, 1),
        })}
        {LabelledBar({
          dataKey: 'DesGrp_Count_ORG',
          fill: '#D2E2EE',
          formatter: (d) => formatNumber(d, 1),
        })}
        {LabelledBar({
          dataKey: 'DesGrp_Count_Shortfall',
          fill: '#6c757d',
          formatter: (d) => formatNumber(d, 1),
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
