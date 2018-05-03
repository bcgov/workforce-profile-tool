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
        +data.Applied_Leadership,
        +data.Business_Leadership,
        +data.Strategic_Leadership
      ]

      let title = VARIABLE_MAPPING
        .filter(v => v.key === 'DesignatedMinority_Group')[0]
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
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100, 1) },
          margins: { top: 0, left: 125, bottom: 40, right: 40 },
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
