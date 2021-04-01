import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

import { NIVO_BASE_PROPS } from '../Helpers/graphs'
import { parseFloatClean } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

interface Props {
  title: string
}

const ProgressGraph = ({ title }: Props): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d) => ({
      Des_Grp: d.Des_Grp,
      '2018_pc': parseFloatClean(d['2018_pc']),
      '2020_pc': parseFloatClean(d['2020_pc']),
    }))

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={['2018_pc', '2020_pc']}
      indexBy="Des_Grp"
      margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#70CCDB', '#D2E2EE']}
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
        { label: '2018', color: '#70CCDB' },
        { label: '2020', color: '#D2E2EE' },
      ]}
    />
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
