import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import { formatNumber } from '../Services/formatter'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.scss'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  data: FixTypeLater[]
  title: string
}

class HiringGraph extends Component<Props> {
  render(): JSX.Element {
    if (!this.props.data) return <div>&nbsp;</div>

    const data = this.props.data.filter(
      (d) => !['WOM_SM'].includes(d['Des_Grp'])
    )

    const chartData = data.map((d) => {
      return {
        category: VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']),
        count: d['2018_hired_ct'],
        color: '#70CCDB',
      }
    })

    const graph = (
      <PlusPlot.ColumnChart
        data={chartData}
        yLines={[]}
        options={{
          height: 500,
          dataLabels: {
            position: -10,
            formatter: (d: FixTypeLater) => formatNumber(d),
          },
          margins: { top: 10, left: 60, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: 'Count' },
          font: '"myriad-pro", "Myriad Pro"',
        }}
      />
    )

    const legend = (
      <Legend items={[{ label: 'Hired, 2015 to 2018', color: '#70CCDB' }]} />
    )

    return (
      <GraphFrame
        className="Hiring"
        title={this.props.title}
        graph={graph}
        legend={legend}
      />
    )
  }
}

export default HiringGraph
