import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import Legend from './Legend'
import GraphFrame from './GraphFrame'

import './Graphs.scss'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  data: FixTypeLater[]
  title: string
}

class ProgressGraph extends Component<Props> {
  render(): JSX.Element {
    if (!this.props.data) return <div>&nbsp;</div>

    const data = this.props.data.filter((d) => d['Des_Grp'] !== 'AS_TOTAL')

    const chartData = data.map((d) => {
      const values = [d['2015_pc'], d['2018_pc']]
      const key = d['Des_Grp']

      let title
      try {
        title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', key)
      } catch (e) {
        if (key === 'WOM_SM') title = 'Women in Senior Mgmt'
      }

      return {
        category: title,
        values,
      }
    })

    const graph = (
      <PlusPlot.GroupedColumnChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          height: 500,
          dataLabels: {
            position: -10,
            formatter: (d: FixTypeLater) => formatPercent(d, 1, 100),
          },
          margins: { top: 20, left: 50, bottom: 40, right: 20 },
          axes: { xAxisLabel: '', yAxisLabel: '% representation' },
          font: '"myriad-pro", "Myriad Pro"',
        }}
      />
    )

    const legend = (
      <Legend
        items={[
          { label: '2015', color: '#70CCDB' },
          { label: '2018', color: '#D2E2EE' },
        ]}
      />
    )

    return (
      <GraphFrame
        className="Progress"
        title={this.props.title}
        graph={graph}
        legend={legend}
      />
    )
  }
}

export default ProgressGraph
