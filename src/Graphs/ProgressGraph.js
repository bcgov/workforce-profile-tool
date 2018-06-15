import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class ProgressGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const data = this.props.data.filter(d => d['Des_Grp'] !== 'AS_TOTAL')

    const chartData = data.map(d => {
      const values = [ +d['2013_pc'], +d['2015_pc'] ]
      const key = d['Des_Grp']

      let title
      try {
        title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', key)
      } catch (e) {
        if (key === 'WOM_SM') title = 'Women in Senior Mgmt'
      }

      return {
        category: title,
        values
      }
    })

    const graph = (
      <PlusPlot.GroupedColumnChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          height: 500,
          dataLabels: { position: -10, formatter: (d) => formatPercent(d / 100, 1) },
          margins: { top: 20, left: 50, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
    />)

    const legend = (
      <Legend items={[
        { label: '2013', color: '#70CCDB' },
        { label: '2015', color: '#D2E2EE' }
      ]} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} filterCount={this.props.filterCount} />
    )
  }
}

export default ProgressGraph
