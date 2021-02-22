import * as R from 'recharts'
import React from 'react'

import { formatPercent, parseFloatClean } from '../Services/formatter'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import LabelledBar from './LabelledBar'
import { ticks } from '../Services/scales'

interface SubgraphProps {
  data: FixTypeLater[]
  masterTitle?: string
  title?: string
  shortTitle?: string
  varKey?: FixTypeLater
}

const MinistrySubGraph = (props: SubgraphProps): JSX.Element => {
  if (!props.data) return <div>&nbsp;</div>

  let categories =
    props.data && props.data.length ? Object.keys(props.data[0]) : []

  const provincialRepresentation = parseFloat(props.data[0]['BC Population'])

  categories = categories.filter(
    (c) => c !== 'key' && c !== 'Des_Grp' && c !== 'BC Population'
  )

  let hasSuppressedData = false
  let color = ''

  const COLOR_MAP: Dictionary = {
    IND: '#234075',
    DIS: '#70CCDB',
    VM: '#D2E2EE',
    WOM: '#E6B345',
  }

  const chartData = categories.sort().map((category) => {
    const count = props.data.map((row) => +parseFloatClean(row[category]))[0]

    if (count === 0) hasSuppressedData = true

    color = COLOR_MAP[props.data[0]['Des_Grp']]

    if (category.length > 40) {
      category = category.replace(/[^A-Z]/g, '')
    }

    return {
      category,
      count,
      color,
    }
  })

  chartData.sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))

  const formatter = (d: FixTypeLater) =>
    d === 0 ? '<3' : formatPercent(d, 1, 100)

  // const graph = (
  //   <PlusPlot.BarChart
  //     data={chartData}
  //     xLines={[
  //       {
  //         value: provincialRepresentation,
  //         label: `BC Pop: ${formatter(provincialRepresentation)}`,
  //         color: 'black',
  //         yPosition: -20,
  //       },
  //     ]}
  //     options={{
  //       height: 600,
  //       dataLabels: { position: 25, formatter },
  //       margins: { top: 0, left: 250, bottom: 40, right: 40 },
  //       axes: { yAxisLabel: '', xAxisLabel: '% representation' },
  //       font: '"myriad-pro", "Myriad Pro"',
  //     }}
  //   />
  // )

  const tickArray: number[] = ticks(chartData, ['count'])

  console.log('tickArray', tickArray)

  const graph = (
    <R.ResponsiveContainer width="100%" height={600}>
      <R.BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 0, bottom: 15, right: 10 }}
        style={{
          fontSize: '12px',
        }}
        barCategoryGap={2}
        barGap={2}
      >
        <R.XAxis type="number" ticks={tickArray} interval={0}>
          <R.Label offset={-10} position={'insideBottom'}>
            % in leadership positions
          </R.Label>
        </R.XAxis>
        <R.YAxis dataKey="category" type="category" width={250} interval={0} />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'count',
          fill: chartData[0].color,
          formatter,
        })}
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legendItems = props.data.map((d) => {
    const k = d['Des_Grp']
    const label = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)
    return { label, color }
  })

  const legend = (
    <Legend
      items={legendItems}
      notes={
        !hasSuppressedData ? null : (
          <span>
            <b>&lt;3</b> indicates that data has been suppressed because the
            underlying value is less than 3.
          </span>
        )
      }
    />
  )

  return (
    <GraphFrame
      className={`Ministry-${props.varKey}`}
      title={`${props.masterTitle} — ${props.title}`}
      hideFilterNotes
      graph={graph}
      legend={legend}
    />
  )
}

export default MinistrySubGraph