import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'

import './Graphs.css'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class OccupationGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.DesignatedMinority_Group] = dataMap[d.DesignatedMinority_Group] || []
      dataMap[d.DesignatedMinority_Group].push(d)
    })

    const chartData = Object.keys(dataMap).sort().map(k => {
      const data = dataMap[k].filter(d => d.Variable_Type === 'Total')[0]
      const values = [
        +data.DesGrp_Count_Expected,
        +data.DesGrp_Count_ORG,
        +data.DesGrp_Count_Shortfall
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

    return (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          margins: { top: 0, left: 125, bottom: 40, right: 20 },
          axes: { yAxisLabel: '', xAxisLabel: 'Count in BCPS' },
          font: 'Myriad Pro'
        }}
      />
    )
  }
}

export default OccupationGraph
