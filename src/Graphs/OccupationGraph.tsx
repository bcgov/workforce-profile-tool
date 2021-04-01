import * as R from 'recharts'
import React, { useState } from 'react'

import { formatDesGrpTick, formatNumber } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import { VARIABLES } from '../Variables/VariableManager'
import {
  BAR_V_CATEGORY_GAP_SIZE,
  BAR_V_GAP_SIZE,
  NIVO_BASE_PROPS,
} from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import { ResponsiveBar } from '@nivo/bar'

interface Props {
  title: string
}

const LEFT_MARGIN = 140
const RIGHT_MARGIN = 50
const TOP_MARGIN = 50
const BOTTOM_MARGIN = 50

const OccupationGraph = ({ title }: Props): JSX.Element => {
  const { occupationRegionData: data } = useDataManager()

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const filteredData = data.filter((d) => d.Variable_Type === 'Total')

  console.log('filteredData', filteredData)

  const items = filteredData
    .map((d): number[] => {
      return [
        'DesGrp_Count_Expected',
        'DesGrp_Count_ORG',
        'DesGrp_Count_Shortfall',
      ].map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={[
        'DesGrp_Count_Expected',
        'DesGrp_Count_ORG',
        'DesGrp_Count_Shortfall',
      ]}
      indexBy="Des_Grp"
      margin={{
        top: TOP_MARGIN,
        right: RIGHT_MARGIN,
        bottom: BOTTOM_MARGIN,
        left: LEFT_MARGIN,
      }}
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
        format: (d: FixTypeLater) =>
          VARIABLES.displayNameByKey('Des_Grp', d) as string,
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
      labelFormat={(d): FixTypeLater => {
        const numD = isNaN(+d) ? 0 : +d
        console.log('numD', numD)
        return ((
          <tspan
            dy={0}
            // dx={-numD + 5 + numD * ((width - 180 - 30) / maxItem)}
            // dx={numD * ((width - 180 - 30) / maxItem)}
            dx={`${5 + (numD * (width - 220)) / 2 / maxItem}`}
            style={{ textAnchor: 'start' }}
          >
            {numD === 0 && '<3'}
            {numD > 0 && <>{formatNumber(numD)}</>}
          </tspan>
        ) as unknown) as string
      }}
      tooltip={(d: FixTypeLater): JSX.Element => {
        return (
          <div style={{ color: d.color }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)}, {d.id}:{' '}
            {formatNumber(d.data[d.id])}
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  // const graph = (
  //   <R.ResponsiveContainer width="100%" height={500}>
  //     <R.BarChart
  //       data={filteredData}
  //       layout="vertical"
  //       margin={{ left: 30, bottom: 15, right: 20 }}
  //       barCategoryGap={BAR_V_CATEGORY_GAP_SIZE}
  //       barGap={BAR_V_GAP_SIZE}
  //     >
  //       <R.XAxis
  //         type="number"
  //         interval={0}
  //         tickFormatter={(d) => formatNumber(d)}
  //       >
  //         <R.Label offset={-10} position={'insideBottom'}>
  //           Count in BCPS {/* TODO: Fix this? Should it be ministryName? */}
  //         </R.Label>
  //       </R.XAxis>
  //       <R.YAxis
  //         dataKey="Des_Grp"
  //         type="category"
  //         tickFormatter={(desGrpKey) => formatDesGrpTick(desGrpKey)}
  //       />
  //       <R.Tooltip />
  //       {LabelledBar({
  //         dataKey: 'DesGrp_Count_Expected',
  //         fill: '#70CCDB',
  //         formatter: (d) => formatNumber(d, ''),
  //       })}
  //       {LabelledBar({
  //         dataKey: 'DesGrp_Count_ORG',
  //         fill: '#D2E2EE',
  //         formatter: (d) => formatNumber(d, ''),
  //       })}
  //       {LabelledBar({
  //         dataKey: 'DesGrp_Count_Shortfall',
  //         fill: '#6c757d',
  //         formatter: (d) => formatNumber(d, ''),
  //       })}
  //     </R.BarChart>
  //   </R.ResponsiveContainer>
  // )

  const legend = (
    <Legend
      items={[
        { label: 'Expected', color: '#70CCDB' },
        { label: 'Actual', color: '#D2E2EE' },
        { label: 'Shortfall', color: '#6c757d' },
      ]}
    />
  )

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
