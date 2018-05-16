import React, { Component } from 'react'
import FlowReportChart from './FlowReportChart'
import { formatNumber } from '../Services/formatter'
import GraphFrame from './GraphFrame'

import './Graphs.css'

import { displayNameByKey } from '../Variables/VariableList'

class FlowReportGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      absolute: false
    }

    this.toggleAbsolute = this.toggleAbsolute.bind(this)
  }

  toggleAbsolute () {
    this.setState({ absolute: !this.state.absolute })
  }

  render () {
    if (!this.props.data) return <div>Loading...</div>

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    console.log('dataMap', dataMap)

    const chartDataOutline = {
      'Hiring_TotalNew': { category: 'New', group: 0, nonGroup: 4068 },
      'Employed_2015': { category: 'Employed', group: 0, nonGroup: 23747 },
      'Promotions_Total': { category: 'Promotions', group: 0, nonGroup: 2842 },
      'Separations_Total': { category: 'Separations', group: 0, nonGroup: 3600 }
    }

    const getRowByType = (array, key) => array.find(item => item.Type === key)

    Object.values(dataMap).forEach(values => {
      console.log('values', values)
      Object.keys(chartDataOutline).forEach(key => {
        console.log('key', key)
        const groupValue = +(getRowByType(values, key).DesGrp_Count_Reg)
        console.log('groupValue', groupValue)
        chartDataOutline[key].group += groupValue
        chartDataOutline[key].nonGroup -= groupValue
      })
    })

    const chartData = Object.values(chartDataOutline)

    if (this.state.absolute) {
      chartData.forEach(d => (d.group = -d.group))
    }

    const graph = (
      <FlowReportChart
        data={chartData}
        yLines={[]}
        stackKeys={['group', 'nonGroup']}
        colors={['#70CCDB', '#D2E2EE']}
        absolute={this.state.absolute}
        options={{
          height: 500,
          dataLabels: { position: -10, formatter: (d) => formatNumber(d) },
          margins: { top: 10, left: 70, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: 'Number' },
          font: 'Myriad Pro'
        }}
      />
    )

    return (
      <div>
        <button className='btn btn-sm btn-primary' onClick={this.toggleAbsolute}>
          {this.state.absolute
            ? 'Show proportional numbers'
            : 'Show absolute numbers'
          }
        </button>
        <br /><br />
        <GraphFrame graph={graph} />
      </div>
    )
  }
}

export default FlowReportGraph
