import { ResponsiveBar } from '@nivo/bar'
import React, { useCallback, useState } from 'react'
import Color from 'color'

import { formatNumber } from '../Helpers/formatter'
import { NIVO_BASE_PROPS, processDataForGraph } from '../Helpers/graphs'
import { displayNameByKey } from '../Data/DataManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'
import { OccupationRegionRawData } from '../@types/DataTypes'
import { horizontalLabel, labelValue } from './horizontalLabel'

interface Props {
  title: string
  data: OccupationRegionRawData[]
}

const MARGINS = {
  left: 160,
  right: 55,
  top: 0,
  bottom: 50,
}

const OccupationGraph = ({ data, title }: Props): JSX.Element => {
  const dataDefinitions = [
    { key: 'DesGrp_Count_Expected', label: 'Expected', color: '#70CCDB' },
    { key: 'DesGrp_Count_ORG', label: 'Actual', color: '#D2E2EE' },
    { key: 'DesGrp_Count_Shortfall', label: 'Shortfall', color: '#6c757d' },
  ]

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const semiFilteredData = data.filter(
    (d: FixTypeLater) => d.Variable_Type === 'Total'
  )

  const { dataKeys, filteredData } = processDataForGraph(
    semiFilteredData,
    dataDefinitions
  )
  filteredData.reverse()

  const items = filteredData
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const labelCallback = useCallback(() => {
    return horizontalLabel(MARGINS, width, maxItem, (d: FixTypeLater) => {
      return formatNumber(d, '')
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
      colors={['#70CCDB', '#D2E2EE', '#6c757d']}
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
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) => displayNameByKey('Des_Grp', d) as string,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Count in BCPS',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      }}
      labelFormat={labelCallback()}
      label={labelValue}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: Color(d.color).darken(0.3).hex() }}>
            {displayNameByKey('Des_Grp', d.indexValue)},{' '}
            {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
            {formatNumber(d.data[d.id])}
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = <Legend items={dataDefinitions} />

  return (
    <GraphFrame
      className="Occupation"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default OccupationGraph
