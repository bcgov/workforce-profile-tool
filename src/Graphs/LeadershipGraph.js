import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const chartData = this.props.data.map(d => {
      const values = [
        +d.Applied_Leadership,
        +d.Business_Leadership,
        +d.Strategic_Leadership
      ]

      return {
        category: VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']),
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
          margins: { top: 0, left: 140, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% in leadership positions' },
          font: 'Myriad Pro'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'Applied Leadership', color: '#70CCDB' },
        { label: 'Business Leadership', color: '#D2E2EE' },
        { label: 'Strategic Leadership', color: '#6c757d' }
      ]} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default RegionGraph
