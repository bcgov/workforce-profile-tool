import * as R from 'recharts'
import React from 'react'

import { formatPercent, parseFloatClean } from '../Helpers/formatter'
import { ticks } from '../Helpers/scales'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'
import { MinistryRawData } from '../@types/DataTypes'

interface SubgraphProps {
  data: MinistryRawData[]
  masterTitle?: string
  shortTitle?: string
  title?: string
  varKey?: FixTypeLater
}

const MinistrySubGraph = (props: SubgraphProps): JSX.Element => {
  if (!props.data) return <div>&nbsp;</div>

  let categories =
    props.data && props.data.length ? props.data.map((d) => d.Ministry_Key) : []

  console.log('categories', categories, props.data[0])

  const provincialRepresentation = parseFloat(
    props.data.find((d) => d.Ministry_Key === 'BC Population')!.Value
  )

  console.log(provincialRepresentation)

  categories = categories.filter(
    (c) => c !== 'key' && c !== 'Des_Grp' && c !== 'BC Population'
  )

  let hasSuppressedData = false
  let color = ''

  const COLOR_MAP: Dictionary<string> = {
    IND: '#234075',
    DIS: '#70CCDB',
    VM: '#D2E2EE',
    WOM: '#E6B345',
  }

  const chartData = categories.map((category) => {
    const count = +parseFloatClean(
      props.data.find((d) => d.Ministry_Key === category)!.Value
    )

    const categoryName = VARIABLES.displayNameByKey('Ministry_Key', category)

    if (count === 0) hasSuppressedData = true

    color = COLOR_MAP[props.data[0]['Des_Grp']]

    if (category.length > 40) {
      category = category.replace(/[^A-Z]/g, '')
    }

    return {
      category: categoryName,
      count,
      color,
    }
  })

  chartData.sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))

  const formatter = (d: FixTypeLater) =>
    d === 0 ? '<3' : formatPercent(d, 1, 100)

  const tickArray: number[] = ticks(chartData, ['count'])

  const graph = (
    <R.ResponsiveContainer width="100%" height={700}>
      <R.BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 0, bottom: 15, right: 35 }}
        style={{
          fontSize: '12px',
        }}
        barCategoryGap={2}
        barGap={2}
      >
        <R.XAxis
          type="number"
          ticks={tickArray}
          domain={['dataMin', 'dataMax']}
          interval={0}
          tickFormatter={(d) => formatPercent(d, 0, 100)}
        >
          <R.Label offset={-10} position={'insideBottom'}>
            % representation
          </R.Label>
        </R.XAxis>
        <R.YAxis dataKey="category" type="category" width={250} interval={0} />
        <R.Tooltip />
        {LabelledBar({
          dataKey: 'count',
          fill: chartData[0].color,
          formatter,
        })}
        <R.ReferenceLine x={provincialRepresentation} stroke={'#333'}>
          <R.Label position="insideBottomLeft" dy={-10} dx={5}>
            {`BC Pop: ${formatter(provincialRepresentation)}`}
          </R.Label>
        </R.ReferenceLine>
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  const legendItems = [
    {
      label: VARIABLES.displayNameByKey('Des_Grp', props.data[0].Des_Grp),
      color,
    },
  ]

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
      graph={graph}
      legend={legend}
    />
  )
}

export default MinistrySubGraph
