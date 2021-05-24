import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useCallback, useState } from 'react'

import { labelValue, verticalLabel } from './labels'
import { DEFAULT_GRAPH_WIDTH, NIVO_BASE_PROPS } from '../Helpers/graphs'
import { formatPercent, parseFloatClean } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'

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

  const [width, setWidth] = useState(DEFAULT_GRAPH_WIDTH)

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

  const { labelCallback, items } = useGraph({
    data: filteredData,
    dataKeys,
    width: 500,
    formatter: (d: FixTypeLater) => formatPercent(d, 1, 100),
    margins: MARGINS,
    labelIsVertical: true,
  })

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={dataKeys}
      margin={MARGINS}
      colors={dataKeys.map(
        (dataKey) =>
          dataDefinitions.find((dd) => dd.key === dataKey)?.color || ''
      )}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) =>
          (width < 576
            ? shortDisplayNameByKey('Des_Grp', d)
            : displayNameByKey('Des_Grp', d)) as string,
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
      labelFormat={labelCallback()}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {displayNameByKey('Des_Grp', d.indexValue)},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
      // Override NIVO_BASE_PROPS; these MUST come after the line above
      layout={'vertical'}
      enableGridX={false}
      enableGridY={true}
    />
  )

  const legend = (
    <Legend items={dataDefinitions.filter((dd) => dataKeys.includes(dd.key))} />
  )

  return (
    <GraphFrame
      items={items}
      className="Progress"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default ProgressGraph
