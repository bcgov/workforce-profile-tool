import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class ProgressGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    delete dataMap['AS_TOTAL']

    const chartData = Object.keys(dataMap).sort().map(k => {
      const data = dataMap[k][0]
      console.log('data', data)

      const values = [
        +data['2013_pc'],
        +data['2015_pc']
      ]

      let title
      try {
        title = VARIABLE_MAPPING
          .filter(v => v.key === 'Des_Grp')[0]
          .options
          .filter(v => v.key === k)[0].display
      } catch (e) {
        console.log(e)
        if (k === 'WOM_SM') title = 'Women in Senior Mgmt'
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
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default ProgressGraph
