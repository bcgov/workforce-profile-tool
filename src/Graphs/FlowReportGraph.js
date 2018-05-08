import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import { formatNumber } from '../Services/formatter'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { displayNameByKey } from '../Variables/VariableList'

class FlowReportGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const data = this.props.data.filter(d => !['WOM_SM'].includes(d['Des_Grp']))

    const chartData = data.map(d => {
      return {
        category: displayNameByKey('Des_Grp', d['Des_Grp']),
        count: +d['2015_hired_ct'],
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
          margins: { top: 10, left: 50, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )

    return (
      <GraphFrame graph={graph} />
    )
  }
}

export default FlowReportGraph
