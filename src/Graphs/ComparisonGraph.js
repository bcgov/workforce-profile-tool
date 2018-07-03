import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.css'

import { formatPercent } from '../Services/formatter'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class ComparisonGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    const chartData = this.props.data.map(d => {
      const count = +d.Employees_BCPS
      const comparators = [
        { value: +d.Available_Workforce_BCPS, color: '#70CCDB' },
        { value: +d.Employees_BC_Population, color: '#D2E2EE' }
      ]

      return {
        category: VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']),
        color: '#6c757d',
        count,
        comparators
      }
    })

    const graph = (
      <PlusPlot.BulletBarChart
        data={chartData}
        options={{
          height: 500,
          dataLabels: { position: 25, formatter: (d) => formatPercent(d / 100, 1) },
          margins: { top: 0, left: 140, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: 'Myriad Pro'
        }}
        xLines={[]}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'BC Public Service', color: '#6c757d' },
        { label: 'Available Workforce', color: '#70CCDB', tooltip: `The representation of the target group in the BC Workforce according to Statistics Canada's 2011 National Household Survey The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Organization, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Organization.` },
        { label: 'BC Population', color: '#D2E2EE', tooltip: `Statistics Canada, 2011 National Household Survey` }
      ]} />
    )

    return (
      <GraphFrame className='Comparison' title={this.props.title} graph={graph} legend={legend} />
    )
  }
}

export default ComparisonGraph
