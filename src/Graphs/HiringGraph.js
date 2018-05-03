import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import { formatNumber } from '../Services/formatter'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class HiringGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    delete dataMap['WOM_SM']

    const chartData = Object.keys(dataMap).sort().map(k => {
      const data = dataMap[k][0]
      console.log('data', data)

      let title
      try {
        title = VARIABLE_MAPPING
          .filter(v => v.key === 'Des_Grp')[0]
          .options
          .filter(v => v.key === k)[0].display
      } catch (e) {
        console.log(e)
        if (k === 'AS_TOTAL') title = 'Total Hired'
      }

      return {
        category: title,
        count: +data['2015_hired_ct'],
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

export default HiringGraph
