import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useCallback, useState } from 'react'

import { ComparisonRawData } from '../@types/DataTypes'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { getTooltip } from '../Helpers/tooltipHelper'
import { horizontalLabel, labelValue } from './horizontalLabel'
import { NIVO_BASE_PROPS, processDataForGraph } from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'

interface Props {
  data: ComparisonRawData[]
  ministry?: string | null
  title: string
  year: string
}

const MARGINS = {
  left: 160,
  right: 50,
  top: 0,
  bottom: 50,
}

const ComparisonGraph = ({
  data,
  ministry,
  title,
  year,
}: Props): JSX.Element => {
  const dataDefinitions = [
    {
      key: 'Employees_BCPS',
      label: `${displayNameByKey('Ministry_Key', ministry)}`,
      color: '#6c757d',
    },
    {
      key: 'Available_Workforce_BCPS',
      label: 'Available Workforce',
      color: '#70CCDB',
      tooltip: getTooltip('comparison-available-workforce', year),
    },
    {
      key: 'Employees_BC_Population',
      label: 'BC Population',
      color: '#D2E2EE',
      tooltip: getTooltip('comparison-bc-population', year),
    },
  ]

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const { dataKeys, filteredData } = processDataForGraph(data, dataDefinitions)
  filteredData.reverse()

  const items = filteredData
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

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
      colors={['#6c757d', '#70CCDB', '#D2E2EE']}
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
        format: (d: FixTypeLater) => displayNameByKey('Des_Grp', d) as string,
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
      className="Comparison"
      title={title}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
    />
  )
}

export default ComparisonGraph
