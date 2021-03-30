import React from 'react'

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import { useDataManager } from '../Data/DataManager'
import { parseFloatClean } from '../Helpers/formatter'
import { VARIABLES } from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import Legend from './Legend'
import GraphFrame from './GraphFrame'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface Props {
  title: string
}

const ProgressGraph2 = ({ title }: Props): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const filteredData = data
    .filter((d) => d['Des_Grp'] !== 'AS_TOTAL')
    .map((d) => ({
      Des_Grp: d.Des_Grp,
      '2018_pc': parseFloatClean(d['2018_pc']),
      '2020_pc': parseFloatClean(d['2020_pc']),
    }))

  console.log('filteredData', filteredData)

  // const data = [
  //   {
  //     country: 'AD',
  //     'hot dog': 17,
  //     'hot dogColor': 'hsl(75, 70%, 50%)',
  //     burger: 138,
  //     burgerColor: 'hsl(258, 70%, 50%)',
  //     sandwich: 39,
  //     sandwichColor: 'hsl(290, 70%, 50%)',
  //     kebab: 3,
  //     kebabColor: 'hsl(82, 70%, 50%)',
  //     fries: 132,
  //     friesColor: 'hsl(117, 70%, 50%)',
  //     donut: 177,
  //     donutColor: 'hsl(188, 70%, 50%)',
  //   },
  // ]

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={['2018_pc', '2020_pc']}
      indexBy="Des_Grp"
      margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#70CCDB', '#D2E2EE']}
      groupMode={'grouped'}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      theme={{
        axis: {
          legend: {
            text: {
              fontFamily: 'Myriad Pro',
              fontSize: '16',
            },
          },
          ticks: {
            text: {
              fontFamily: 'Myriad Pro',
              fontSize: '13',
            },
            line: {
              stroke: '#ccc',
              strokeWidth: 0.5,
            },
          },
        },
        labels: {
          text: {
            fontFamily: 'Myriad Pro',
            fontSize: '14',
          },
        },
        grid: {
          line: {
            stroke: '#ccc',
            strokeWidth: 0.5,
          },
        },
      }}
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
      labelSkipWidth={12}
      labelSkipHeight={0}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={(d: FixTypeLater): JSX.Element => {
        console.log('d', d)
        return (
          <div style={{ color: d.color }}>
            {VARIABLES.displayNameByKey('Des_Grp', d.indexValue)}, {d.id}:{' '}
            {d.data[d.id]}%
          </div>
        )
      }}
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

export default ProgressGraph2
