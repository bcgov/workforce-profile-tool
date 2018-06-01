import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import { displayNameByKey, shortDisplayNameByKey } from '../Variables/VariableList'

import './Graphs.css'

import { parseFloatClean, formatPercent } from '../Services/formatter'

class MinistryGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    // let categories = this.props.data && this.props.data.length
    //   ? Object.keys(this.props.data[0])
    //   : []

    // categories = categories.filter(c => c !== 'key' && c !== 'Des_Grp')

    // // const chartData = categories.sort().map(category => {
    // //   const values = this.props.data.map(row => +parseIntClean(row[category]))

    // //   return {
    // //     category: category,
    // //     values
    // //   }
    // // })

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const graphs = Object.keys(dataMap).map(k => {
      let title = displayNameByKey('Des_Grp', k)
      let shortTitle = shortDisplayNameByKey('Des_Grp', k)
      return (
        <div key={k}>
          <h2>{title}</h2>
          <MinistrySubGraph data={dataMap[k]} shortTitle={shortTitle} />
          <br />
          <br />
        </div>
      )
    })

    return (<div>{graphs}</div>)
  }
}

class MinistrySubGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    let categories = this.props.data && this.props.data.length
      ? Object.keys(this.props.data[0])
      : []

    categories = categories.filter(c => c !== 'key' && c !== 'Des_Grp')

    let hasSuppressedData = false

    const chartData = categories.sort().map(category => {
      const values = this.props.data.map(row => +parseFloatClean(row[category]))

      if (values.includes(0)) hasSuppressedData = true

      return {
        category: category,
        values
      }
    })

    chartData.sort((a, b) => (a.values[0] < b.values[0] ? 1 : (a.values[0] > b.values[0] ? -1 : 0)))

    // TODO: add colormap functionality to grouped chart
    const COLOR_MAP = {
      'IND': '#234075',
      'DIS': '#70CCDB',
      'VM': '#D2E2EE',
      'WOM': '#E6B345'
    }

    const color = COLOR_MAP[this.props.data[0]['Des_Grp']]

    const formatter = (d) => (d === 0) ? '<3' : formatPercent(d, 1, 100)

    const graph = (
      <PlusPlot.GroupedBarChart
        data={chartData}
        xLines={[]}
        colors={[color]}
        options={{
          height: 600,
          dataLabels: { position: 25, formatter },
          margins: { top: 0, left: 290, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
      />
    )

    const legendItems = this.props.data.map((d, i) => {
      const k = d['Des_Grp']
      const label = displayNameByKey('Des_Grp', k)
      return { label, color }
    })

    const legend = (
      <Legend
        items={legendItems}
        notes={!hasSuppressedData ? null : <span><b>&lt;3</b> indicates that data has been suppressed because the underlying value is less than 3.</span>} />
    )

    return (
      <GraphFrame graph={graph} legend={legend} />
    )
  }
}

export default MinistryGraph
