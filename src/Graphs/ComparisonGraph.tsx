import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as R from 'recharts'

import { formatDesGrpTick, formatPercent } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import GraphFrame from './GraphFrame'
import LabelledBar from './LabelledBar'
import Legend from './Legend'

import './Graphs.scss'
import {
  BAR_V_CATEGORY_GAP_SIZE,
  BAR_V_GAP_SIZE,
  NIVO_BASE_PROPS,
} from '../Helpers/graphs'
import FixTypeLater from '../@types/FixTypeLater'
import { ResponsiveBar } from '@nivo/bar'
import { VARIABLES } from '../Variables/VariableManager'

interface Props {
  ministry?: string | null
  title: string
}

const LEFT_MARGIN = 140
const RIGHT_MARGIN = 40
const TOP_MARGIN = 50
const BOTTOM_MARGIN = 50

const ComparisonGraph = ({ ministry, title }: Props): JSX.Element => {
  const { comparisonData: data } = useDataManager()

  const [width, setWidth] = useState(620)

  if (!data) return <div>&nbsp;</div>

  const filteredData = data

  const items = data
    .map((d): number[] => {
      return [
        'Employees_BCPS',
        'Available_Workforce_BCPS',
        'Employees_BC_Population',
      ].map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items)

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={[
        'Employees_BCPS',
        'Available_Workforce_BCPS',
        'Employees_BC_Population',
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
        legend: '% representation',
        legendPosition: 'middle',
        legendOffset: 40,
        format: (d: FixTypeLater) =>
          `${(+d).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`,
      }}
      labelFormat={(d): FixTypeLater => {
        const numD = +d
        return ((
          <tspan
            dy={0}
            // dx={-numD + 5 + numD * ((width - 180 - 30) / maxItem)}
            // dx={numD * ((width - 180 - 30) / maxItem)}
            dx={`${5 + (numD * (width - 210)) / 2 / maxItem}`}
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
          <div style={{ color: d.color }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)}, {d.id}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = (
    <Legend
      items={[
        { label: `${ministry}`, color: '#6c757d' },
        {
          label: 'Available Workforce',
          color: '#70CCDB',
          tooltip: `The representation of the target group in the BC Workforce according to Statistics Canada's 2011 National Household Survey The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Organization, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Organization.`,
        },
        {
          label: 'BC Population',
          color: '#D2E2EE',
          tooltip: `Statistics Canada, 2011 National Household Survey`,
        },
      ]}
    />
  )

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
