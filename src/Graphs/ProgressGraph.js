import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'

import './Graphs.css'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class ProgressGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    delete dataMap['TOTAL']

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
          .filter(v => v.key === 'DesignatedMinority_Group')[0]
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

    return (
      <PlusPlot.GroupedColumnChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          margins: { top: 0, left: 50, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )
  }
}

export default ProgressGraph
