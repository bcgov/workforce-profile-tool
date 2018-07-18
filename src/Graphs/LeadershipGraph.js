import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    const chartData = this.props.data.map(d => {
      const values = [
        +d.Executive,
        +d.Management_Band
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
          font: '"myriad-pro", "Myriad Pro"'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'Executive Leadership', color: '#70CCDB', tooltip: `Executive Leadership includes all positions classified as Assistant Deputy Minister and Deputy Minister.` },
        { label: 'Management Band Leadership', color: '#D2E2EE', tooltip: `Management Band Leadership includes all positions classified as Band 1 through 6, and those classified as Applied Leadership, Business Leadership, and Strategic Leadership. Order in Council (OIC) appointments within these classifications is also included.` }
      ]} />
    )

    return (
      <GraphFrame className='Leadership' title={this.props.title} graph={graph} legend={legend} />
    )
  }
}

export default RegionGraph
