import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React from 'react'

import { labelValue } from './horizontalLabel'
import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { parseFloatClean } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

interface Props {
  title: string
  data: ProgressRawData[]
}

const MARGINS = { top: 50, right: 30, bottom: 50, left: 70 }

const ProgressGraph = ({ data, title }: Props): JSX.Element => {
  const dataDefinitions = [
    { key: '2015_pc', label: '2015', color: '#6c757d' },
    { key: '2018_pc', label: '2018', color: '#70CCDB' },
    { key: '2020_pc', label: '2020', color: '#D2E2EE' },
  ]

  if (!data) return <div>&nbsp;</div>

  const dataKeys = Object.keys(data[0]).filter((key) => key.endsWith('_pc'))

  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d: FixTypeLater) => {
      const obj: FixTypeLater = { Des_Grp: d.Des_Grp }
      dataKeys.forEach((dataKey) => {
        obj[dataKey] = parseFloatClean(d[dataKey])
        obj[`${dataKey}_str`] = d[dataKey]
      })
      return obj
    })

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={dataKeys}
      indexBy="Des_Grp"
      margin={MARGINS}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={dataKeys.map(
        (dataKey) =>
          dataDefinitions.find((dd) => dd.key === dataKey)?.color || ''
      )}
      groupMode={'grouped'}
      innerPadding={2}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) =>
          VARIABLES.displayNameByKey('Des_Grp', d) as string,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '% representation',
        legendPosition: 'middle',
        legendOffset: -50,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
      }}
      label={labelValue}
      labelFormat={(d) =>
        ((
          <tspan y={-10}>
            {d === 0 && '<3'}
            {d > 0 && (
              <>{d.toLocaleString(undefined, { minimumFractionDigits: 1 })}%</>
            )}
          </tspan>
        ) as unknown) as string
      }
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = (
    <Legend items={dataDefinitions.filter((dd) => dataKeys.includes(dd.key))} />
  )

  return (
    <GraphFrame
      className="Progress"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default ProgressGraph
