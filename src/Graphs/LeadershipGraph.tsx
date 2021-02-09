import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import './Graphs.scss'

import { formatPercent } from '../Services/formatter'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'

import * as R from 'recharts'
import { useDataManager } from '../Data/DataManager'
import { Leadership2018RawDataType } from '../@types/DataTypes'

interface TitleProps {
  title: string
}

const LeadershipGraph = ({ title }: TitleProps): JSX.Element => {
  const { leadershipData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const legend = (
    <Legend
      items={[
        {
          label: 'Executive Leadership',
          color: '#70CCDB',
          tooltip: `Executive Leadership includes all positions classified as Assistant Deputy Minister and Deputy Minister.`,
        },
        {
          label: 'Management Band Leadership',
          color: '#D2E2EE',
          tooltip: `Management Band Leadership includes all positions classified as Band 1 through 6, and those classified as Applied Leadership, Business Leadership, and Strategic Leadership. Order in Council (OIC) appointments within these classifications is also included.`,
        },
      ]}
    />
  )

  const graph = (
    <R.ResponsiveContainer width="100%" height={500}>
      <R.BarChart
        data={data}
        layout="vertical"
        margin={{ left: 30 }}
        barCategoryGap={3}
        barGap={2}
      >
        <R.CartesianGrid horizontal={false} />
        <R.XAxis type="number" />
        <R.YAxis dataKey="Des_Grp" type="category" />
        <R.Tooltip />
        <R.Bar dataKey="Executive" fill="#70CCDB">
          {/* @ts-ignore The typings are incorrect, see https://github.com/recharts/recharts/issues/2396 */}
          <R.LabelList
            dataKey="Executive"
            // @ts-ignore The typings are wrong
            position={'right'}
            formatter={(d: string) => `${d}%`}
          />
        </R.Bar>
        <R.Bar dataKey="Management_Band" fill="#D2E2EE">
          {/* @ts-ignore The typings are incorrect, see https://github.com/recharts/recharts/issues/2396 */}
          <R.LabelList
            dataKey="Management_Band"
            // @ts-ignore The typings are wrong
            position={'right'}
            formatter={(d: string) => `${d}%`}
          />
        </R.Bar>
      </R.BarChart>
    </R.ResponsiveContainer>
  )

  return (
    <GraphFrame
      className="Leadership"
      title={title}
      graph={graph}
      legend={legend}
    />
  )
}

export default LeadershipGraph
