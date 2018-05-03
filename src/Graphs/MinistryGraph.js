import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class MinistryGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    console.log('dataMap', dataMap)

    // delete dataMap['WOM']['Des_Grp']

    console.log(dataMap['WOM'])

    const thisData = dataMap['WOM'][0]
    // delete thisData['Des_Grp']

    const chartData = Object.keys(thisData)
      .filter(k => k !== 'Des_Grp' && k !== 'key')
      .map(k => ({ category: k, count: +thisData[k], color: '#70CCDB' }))

    chartData.sort((a, b) => (a.count < b.count ? 1 : (a.count > b.count ? -1 : 0)))

    const graph = (
      <PlusPlot.BarChart
        data={chartData}
        xLines={[]}
        options={{
          height: 700,
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100, 0) },
          margins: { top: 0, left: 250, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'Women', color: '#70CCDB' }
      ]} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default MinistryGraph
