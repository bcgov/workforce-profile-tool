import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import { formatNumber } from '../Services/formatter'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class HiringGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    const data = this.props.data.filter(d => !['WOM_SM'].includes(d['Des_Grp']))

    const chartData = data.map(d => {
      return {
        category: VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']),
        count: +d['2018_hired_ct'],
        color: '#70CCDB'
      }
    })

    const graph = (
      <PlusPlot.ColumnChart
        data={chartData}
        yLines={[]}
        options={{
          height: 500,
          dataLabels: { position: -10, formatter: (d) => formatNumber(d) },
          margins: { top: 10, left: 60, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: 'Count' },
          font: 'Myriad Pro'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'Number Hired', color: '#70CCDB' }
      ]} />
    )

    return (
      <GraphFrame className='Hiring' title={this.props.title} graph={graph} legend={legend} />
    )
  }
}

export default HiringGraph
