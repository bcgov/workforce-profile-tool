import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useState } from 'react'

import { parseFloatClean } from '../Helpers/formatter'
import { MinistryRawData } from '../@types/DataTypes'
import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

interface SubgraphProps {
  data: MinistryRawData[]
  masterTitle?: string
  shortTitle?: string
  title?: string
  varKey?: FixTypeLater
}

const OrganizationSubGraph = (props: SubgraphProps): JSX.Element => {
  if (!props.data) return <div>&nbsp;</div>

  const [width, setWidth] = useState(620)

  let categories =
    props.data && props.data.length ? props.data.map((d) => d.Ministry_Key) : []

  const provincialRepresentation = parseFloat(
    props.data.find((d) => d.Ministry_Key === 'BC Population')!.Value
  )

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

    let categoryName =
      VARIABLES.displayNameByKey('Ministry_Key', category) || ''

    if (count === 0) hasSuppressedData = true

    color = COLOR_MAP[props.data[0]['Des_Grp']]

    if (categoryName.length > 37) {
      categoryName = categoryName.replace(/[^A-Z]/g, '')
    }

    return {
      category: categoryName,
      count,
      color,
    }
  })

  const items = chartData
    .map((d): number[] => {
      return ['count'].map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  chartData.sort((b, a) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))

  const graph = (
    <ResponsiveBar
      data={chartData}
      keys={['count']}
      indexBy="category"
      margin={{ top: 0, right: 60, bottom: 50, left: 255 }}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={chartData[0].color}
      groupMode={'grouped'}
      enableGridX={true}
      enableGridY={false}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      layout={'horizontal'}
      layers={[
        'grid',
        'axes',
        'bars',
        'markers',
        'legends',
        (d) => {
          return (
            <>
              <line
                x1={d.xScale(provincialRepresentation)}
                x2={d.xScale(provincialRepresentation)}
                y1={0}
                y2={d.height}
                width={3}
                stroke={'#333'}
              />
              <text
                x={d.xScale(provincialRepresentation) + 5}
                y={d.height - 10}
              >
                BC Pop: {provincialRepresentation}%
              </text>
            </>
          )
        },
      ]}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) => d,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '% representation',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
      }}
      labelFormat={(d) => {
        const numD = isNaN(+d) ? 0 : +d
        return ((
          <tspan
            dy={0}
            // dx={-numD + 5 + numD * ((width - 180 - 30) / maxItem)}
            // dx={numD * ((width - 180 - 30) / maxItem)}
            dx={`${3 + (numD * (width - 335)) / 2 / maxItem}`}
            style={{ textAnchor: 'start' }}
          >
            {d === 0 && '<3'}
            {d > 0 && (
              <>{d.toLocaleString(undefined, { minimumFractionDigits: 1 })}%</>
            )}
          </tspan>
        ) as unknown) as string
      }}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {d.indexValue}: {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legendItems = [
    {
      key: 'Des_Grp',
      label: VARIABLES.displayNameByKey('Des_Grp', props.data[0].Des_Grp) || '',
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
      setWidthCallback={setWidth}
      height={600}
    />
  )
}

export default OrganizationSubGraph