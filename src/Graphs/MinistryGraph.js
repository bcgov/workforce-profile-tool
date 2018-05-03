import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { parseIntClean, formatPercent } from '../Services/formatter'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class MinistryGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    let categories = this.props.data && this.props.data.length
      ? Object.keys(this.props.data[0])
      : []

    categories = categories.filter(c => c !== 'key' && c !== 'Des_Grp')

    const chartData = categories.sort().map(category => {
      const values = this.props.data.map(row => +parseIntClean(row[category]))

      return {
        category: category,
        values
      }
    })

    console.log('chartData', chartData)

    // console.log('dataMap', dataMap)

    // const chartData = Object.keys(dataMap).sort()
    //   .filter(k => k !== 'Des_Grp' && k !== 'key')
    //   .map(k => ({ category: k, count: +thisData[k], color: '#70CCDB' }))

    chartData.sort((a, b) => (a.values[0] < b.values[0] ? 1 : (a.values[0] > b.values[0] ? -1 : 0)))

    const graph = (
      <PlusPlot.GroupedBarChart
        data={chartData}
        xLines={[]}
        colors={['#234075', '#70CCDB']}
        options={{
          height: 1000,
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100, 0) },
          margins: { top: 0, left: 250, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )

    // TODO: add colormap functionality to grouped chart
    const COLORS = ['#234075', '#70CCDB', '#D2E2EE', '#E6B345']

    const legendItems = this.props.data.map((d, i) => {
      const k = d['Des_Grp']
      const label = VARIABLE_MAPPING
        .filter(v => v.key === 'Des_Grp')[0]
        .options
        .filter(v => v.key === k)[0].display
      return { label, color: COLORS[i] }
    })

    const legend = (
      <Legend items={legendItems} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default MinistryGraph
