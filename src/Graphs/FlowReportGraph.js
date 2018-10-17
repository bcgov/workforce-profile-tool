import React, { Component } from 'react'
import FlowReportChart from './FlowReportChart'
import { parseFloatClean } from '../Services/formatter'
import GraphFrame from './GraphFrame'
import { withRouter } from 'react-router-dom'
import Legend from './Legend'

import './Graphs.css'

class FlowReportGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      absolute: false
    }

    this.toggleAbsolute = this.toggleAbsolute.bind(this)
  }

  toggleAbsolute () {
    const buttonIcon = document.querySelector('.ToggleAbsolute i.fa-sync')
    buttonIcon.classList.add('fa-spin')
    setTimeout(() => buttonIcon.classList.remove('fa-spin'), 300)
    this.setState({ absolute: !this.state.absolute })
  }

  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const chartDataOutline = {
      'Employed_2018': { category: 'Employed', group: 0, nonGroup: null, suppressed: false },
      'Hiring_TotalNew': { category: 'New Hires', group: 0, nonGroup: null, suppressed: false },
      'Separations_Total': { category: 'Separations', group: 0, nonGroup: null, suppressed: false },
      'Promotions_Total': { category: 'Promotions', group: 0, nonGroup: null, suppressed: false }
    }

    const getRowByType = (array, key) => array.find(item => item.Type === key)

    Object.values(dataMap).forEach(values => {
      // console.log('values', values)
      Object.keys(chartDataOutline).forEach(key => {
        // console.log('key', key)
        let regGroup
        let auxGroup
        switch (key) {
          case 'Hiring_TotalNew': {
            regGroup = getRowByType(values, 'Hiring_TotalReg')[`DesGrp_Count_Reg`]
            auxGroup = getRowByType(values, 'Hiring_TotalNew')[`DesGrp_Count_Aux`]
            break
          }
          case 'Separations_Total': {
            regGroup = getRowByType(values, 'Separations_Total')[`DesGrp_Count_Reg`]
            auxGroup = getRowByType(values, 'Separations_TotalAux')[`DesGrp_Count_Aux`]
            break
          }
          default: {
            regGroup = getRowByType(values, key)[`DesGrp_Count_Reg`]
            auxGroup = getRowByType(values, key)[`DesGrp_Count_Aux`]
          }
        }
        chartDataOutline[key].group += parseFloatClean(regGroup) + parseFloatClean(auxGroup)
        // console.log(regGroup, auxGroup, chartDataOutline[key].group)
        if (isNaN(regGroup) || isNaN(auxGroup)) { chartDataOutline[key].suppressed = true }

        if (chartDataOutline[key].nonGroup === null || chartDataOutline[key].nonGroup === 0) {
          let regNonGroup = 0
          let auxNonGroup = 0
          switch (key) {
            case 'Hiring_TotalNew': {
              regNonGroup = getRowByType(values, 'Hiring_TotalReg')[`NonDesGrp_Count_Reg`]
              auxNonGroup = getRowByType(values, 'Hiring_TotalNew')[`NonDesGrp_Count_Aux`]
              break
            }
            case 'Separations_Total': {
              regNonGroup = getRowByType(values, 'Separations_Total')[`NonDesGrp_Count_Reg`]
              auxNonGroup = getRowByType(values, 'Separations_TotalAux')[`NonDesGrp_Count_Aux`]
              break
            }
            default: {
              regNonGroup = getRowByType(values, key)[`NonDesGrp_Count_Reg`]
              auxNonGroup = getRowByType(values, key)[`NonDesGrp_Count_Aux`]
            }
          }
          chartDataOutline[key].nonGroup =
            parseFloatClean(regNonGroup) +
            parseFloatClean(auxNonGroup) +
            parseFloatClean(regGroup) +
            parseFloatClean(auxGroup)
          if (isNaN(regNonGroup) || isNaN(auxNonGroup)) { chartDataOutline[key].suppressed = true }
        }
        chartDataOutline[key].nonGroup -= (parseFloatClean(regGroup) + parseFloatClean(auxGroup))

        if (chartDataOutline[key].nonGroup < 0) {
          // Non-group might be negative; this is if there are more people who
          // are in categories than non-categories. In this case set it to 0.
          chartDataOutline[key].nonGroup = 0
        }
      })
    })

    const chartData = Object.values(chartDataOutline)
    let yAxisLabel = 'Proportion'

    if (this.state.absolute) {
      chartData.forEach(d => { d.group = -d.group })
      yAxisLabel = 'Number'
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
          dataLabels: { position: -10 },
          margins: { top: 20, left: 70, bottom: 40, right: 20 },
          axes: { xAxisTicksVisible: false, xAxisLabel: '', yAxisLabel },
          font: '"myriad-pro", "Myriad Pro"'
        }}
      />
    )

    const legend = (
      <Legend
        items={[
          { label: 'Designated Group', color: '#70CCDB' },
          { label: 'Non-Designated Group', color: '#D2E2EE' }
        ]}
        notes={
          <span>Proportion may be greater than 100% because individuals may belong to more than one designated group.
            <br /><br />
          * indicates suppressed data has been excluded from the calculation. Refer to the tables below.</span>
        }
      />
    )

    return (
      <div>
        <button className='btn btn-sm btn-primary ToggleAbsolute' onClick={this.toggleAbsolute}>
          <i className='fas fa-sync' />
          {this.state.absolute
            ? 'Show proportional numbers'
            : 'Show absolute numbers'
          }
        </button>
        <GraphFrame className='FlowReport' title={this.props.title} graph={graph} legend={legend} />
      </div>
    )
  }
}

export default withRouter(FlowReportGraph)
