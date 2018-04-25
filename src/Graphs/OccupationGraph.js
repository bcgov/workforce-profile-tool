import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'

class OccupationGraph extends Component {
  render () {
    console.log(PlusPlot.GroupedBarChart)

    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.DesignatedMinority_Group] = dataMap[d.DesignatedMinority_Group] || []
      dataMap[d.DesignatedMinority_Group].push(d)
    })

    const chartData = Object.keys(dataMap).sort().map(k => {
      console.log('k', k)
      return {
        category: k,
        values: [5, 4, 3]
      }
    })

    return (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
      />
    )
  }
}

export default OccupationGraph
