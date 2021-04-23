import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useCallback, useState } from 'react'

import { horizontalLabel, labelValue, verticalLabel } from './labels'
import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { formatPercent, parseFloatClean } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
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

  const [width, setWidth] = useState(620)

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

  const items = filteredData
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const labelCallback = useCallback(() => {
    return verticalLabel(MARGINS, 500, maxItem, (d: FixTypeLater) => {
      return formatPercent(d, 1, 100)
    })
  }, [maxItem, width])

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
      setWidthCallback={setWidth}
    />
  )
}

export default ProgressGraph
