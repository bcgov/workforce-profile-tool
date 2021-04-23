import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useCallback, useState } from 'react'

import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { getTooltip } from '../Helpers/tooltipHelper'
import { horizontalLabel, labelValue } from './horizontalLabel'
import { LeadershipRawData } from '../@types/DataTypes'
import { NIVO_BASE_PROPS, processDataForGraph } from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  data: LeadershipRawData[]
  title: string
  year: string
}

const MARGINS = { left: 160, right: 50, top: 0, bottom: 50 }

const LeadershipGraph = ({ data, title, year }: Props): JSX.Element => {
  const dataDefinitions = [
    {
      key: 'Executive',
      label: 'Executive Leadership',
      color: '#70CCDB',
      tooltip: getTooltip('leadership-executive-leadership', year),
    },
    {
      key: 'Management_Band',
      label: 'Management Band Leadership',
      color: '#D2E2EE',
      tooltip: getTooltip('leadership-management-band-leadership', year),
    },
  ]

  const [width, setWidth] = useState(620)

  MARGINS.left = width < 576 ? 80 : 160

  if (!data) return <div>&nbsp;</div>

  const { dataKeys, filteredData } = processDataForGraph(data, dataDefinitions)
  filteredData.reverse()

  const items = filteredData
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()
    .reverse()

  const maxItem = Math.max(...items)

  const labelCallback = useCallback(() => {
    return horizontalLabel(MARGINS, width, maxItem, (d: FixTypeLater) => {
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
      colors={['#70CCDB', '#D2E2EE']}
      layout={'horizontal'}
      groupMode={'grouped'}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      enableGridX={true}
      enableGridY={false}
      innerPadding={2}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) =>
          (width < 576
            ? shortDisplayNameByKey('Des_Grp', d)
            : displayNameByKey('Des_Grp', d)) as string,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '% in leadership positions',
        legendPosition: 'middle',
        legendOffset: 40,
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

  const legend = <Legend items={dataDefinitions} />

  return (
    <GraphFrame
      className="Leadership"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default LeadershipGraph
