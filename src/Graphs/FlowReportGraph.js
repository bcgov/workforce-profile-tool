import React, { Component } from 'react'
import FlowReportChart from './FlowReportChart'
import { formatNumber } from '../Services/formatter'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { displayNameByKey } from '../Variables/VariableList'

class FlowReportGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const data = this.props.data.filter(d => !['WOM_SM'].includes(d['Des_Grp']))

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    console.log('dataMap', dataMap)

    const ind = dataMap['IND']

    const theData = []

    const getRowByType = (array, key) => {
      console.log('array', array, 'key', key)
      const theItem = array.find(item => item.Type === key)
      console.log('theItem', theItem)
      return theItem
    }

    theData.push({
      category: 'Employed',
      group: +(getRowByType(ind, 'Employed_2015').DesGrp_Count_Reg),
      nonGroup: +(getRowByType(ind, 'Employed_2015').NonDesGrp_Count_Reg)
    })
    theData.push({
      category: 'New',
      group: +(getRowByType(ind, 'Hiring_TotalNew').DesGrp_Count_Reg),
      nonGroup: +(getRowByType(ind, 'Hiring_TotalNew').NonDesGrp_Count_Reg)
    })

    console.log('theData', theData)

    const graph = (
      <FlowReportChart
        data={theData}
        yLines={[]}
        stackKeys={['group', 'nonGroup']}
        colors={['#1b6c94', '#1b4e94']}
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
