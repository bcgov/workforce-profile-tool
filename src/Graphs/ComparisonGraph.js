import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'
import { displayNameByKey } from '../Variables/VariableList'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const chartData = this.props.data.map(d => {
      const values = [
        +d.BCPS,
        +d.Available_Workforce,
        +d.Employees_BC_Population
      ]

      return {
        category: displayNameByKey('Des_Grp', d['Des_Grp']),
        values
      }
    })

    const graph = (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          height: 500,
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100, 1) },
          margins: { top: 0, left: 125, bottom: 40, right: 40 },
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
