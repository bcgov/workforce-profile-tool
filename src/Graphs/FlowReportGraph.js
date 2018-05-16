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
      'Hiring_TotalNew': { category: 'New', group: 0, nonGroup: null },
      'Employed_2015': { category: 'Employed', group: 0, nonGroup: null },
      'Promotions_Total': { category: 'Promotions', group: 0, nonGroup: null },
      'Separations_Total': { category: 'Separations', group: 0, nonGroup: null }
    }

    const getRowByType = (array, key) => array.find(item => item.Type === key)

    Object.values(dataMap).forEach(values => {
      Object.keys(chartDataOutline).forEach(key => {
        const groupValue = +(getRowByType(values, key).DesGrp_Count_Reg)
        // const nonGroupValue = +(getRowByType(values, key).NonDesGrp_Count_Reg)
        chartDataOutline[key].group += groupValue
        if (chartDataOutline[key].nonGroup === null) {
          chartDataOutline[key].nonGroup = +(getRowByType(values, key).Total_Count_Reg)
        }
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
