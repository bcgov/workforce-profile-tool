import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const chartData = Object.keys(dataMap).sort().map(k => {
      const data = dataMap[k][0]
      const values = [
        +data.Employees_Reg_BCPS,
        +data.Employees_Reg_Available_Workforce,
        +data.Employees_BC_Population
      ]

      let title = VARIABLE_MAPPING
        .filter(v => v.key === 'Des_Grp')[0]
        .options
        .filter(v => v.key === k)[0].display

      return {
        category: title,
        values
      }
    })

    const graph = (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          height: 500,
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100) },
          margins: { top: 0, left: 125, bottom: 40, right: 20 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'BC Public Service', color: '#70CCDB' },
        { label: 'Available Workforce', color: '#D2E2EE' },
        { label: 'BC Population', color: '#6c757d' }
      ]} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default RegionGraph
