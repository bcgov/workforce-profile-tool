import { ResponsiveBar } from '@nivo/bar'
import React, { useState } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  NIVO_BASE_PROPS,
} from '../Helpers/graphs'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { formatPercent, parseFloatClean } from '../Helpers/formatter'
import { labelValue } from './labels'
import { ProgressRawData } from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'
import { DataDictionaryEntry } from '../Data/useDataQuery'

interface Props {
  data: ProgressRawData[]
  dataDictionary: DataDictionaryEntry[]
  title: string
}

const MARGINS = { top: 50, right: 30, bottom: 50, left: 70 }

const ProgressGraph = ({ data, dataDictionary, title }: Props): JSX.Element => {
  const dataDefinitions: DataDefinition<ProgressRawData>[] = [
    { key: '2015_pc', label: '2015', color: '#6c757d' },
    { key: '2018_pc', label: '2018', color: '#70CCDB' },
    { key: '2020_pc', label: '2020', color: '#D2E2EE' },
  ]

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  if (!data) return <div>&nbsp;</div>

  const dataKeys = (Object.keys(
    data[0]
  ) as (keyof ProgressRawData)[]).filter((key) => key.endsWith('_pc'))

  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d) => {
      const obj: FixTypeLater = { Des_Grp: d.Des_Grp }
      dataKeys.forEach((dataKey) => {
        obj[dataKey] = parseFloatClean(d[dataKey])
        obj[`${dataKey}_str`] = d[dataKey]
      })
      return obj
    })

  const { labelCallback, items, tooltip } = useGraph({
    bottomAxisText: '% representation',
    data: filteredData,
    dataDefinitions,
    dataKeys,
    formatter: (d) => formatPercent(d, 1, 100),
    labelIsVertical: true,
    margins: MARGINS,
    width: 500,
  })

  const graph = (
    <ResponsiveBar
      axisBottom={{
        format: (d) =>
          (width < GRAPH_WIDTH_BREAKPOINT
            ? shortDisplayNameByKey('Des_Grp', d as string)
            : displayNameByKey('Des_Grp', d as string)) as string,
        legendOffset: 32,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      axisLeft={{
        format: (d) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
        legend: '% representation',
        legendOffset: -50,
        legendPosition: 'middle',
        tickPadding: 5,
        tickRotation: 0,
        tickSize: 5,
      }}
      colors={dataKeys.map(
        (dataKey) =>
          dataDefinitions.find((dd) => dd.key === dataKey)?.color || ''
      )}
      data={filteredData}
      keys={dataKeys}
      label={labelValue}
      labelFormat={labelCallback()}
      margin={MARGINS}
      tooltip={tooltip}
      {...NIVO_BASE_PROPS}
      // Override NIVO_BASE_PROPS; these MUST come after the line above
      layout={'vertical'}
      enableGridX={false}
      enableGridY={true}
    />
  )

  const legend = (
    <Legend
      items={dataDefinitions.filter((dd) => dataKeys.includes(dd.key))}
      dataDictionary={dataDictionary}
    />
  )

  return (
    <GraphFrame
      className="Progress"
      graph={graph}
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={title}
    />
  )
}

export default ProgressGraph
