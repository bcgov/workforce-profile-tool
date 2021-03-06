/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useCallback, useState } from 'react'

import { formatPercent, parseIntClean } from '../Helpers/formatter'
import { horizontalLabel, labelValue } from './labels'
import { MinistryRawData } from '../@types/DataTypes'
import { NIVO_BASE_PROPS, processDataForGraph } from '../Helpers/graphs'
import { displayNameByKey, useDataManager } from '../Data/DataManager'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

interface SubgraphProps {
  color?: string
  data: MinistryRawData[]
  shortTitle?: string
  title?: string
  varKey?: FixTypeLater
}

const MARGINS = { top: 0, right: 60, bottom: 50, left: 255 }

const OrganizationSubGraph = ({
  color,
  data,
  title,
  varKey,
}: SubgraphProps): JSX.Element => {
  const { queryValues } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  const [width, setWidth] = useState(620)

  MARGINS.left = width < 576 ? 80 : 255

  const provincialRepresentation = parseFloat(
    data.find((d) => d.Ministry_Key === 'BC Population')!.Value
  )

  let hasSuppressedData = false

  const legendItems = [
    {
      key: 'Des_Grp',
      label: displayNameByKey('Des_Grp', data[0].Des_Grp) || '',
      color: color || 'black',
    },
  ]

  const subtitle = `${displayNameByKey(
    'Ministry_Key',
    queryValues.Ministry_Key
  )}, ${displayNameByKey(
    'Employee_Type',
    queryValues.Employee_Type
  ).toLowerCase()} employees`

  const { dataKeys, filteredData } = processDataForGraph(
    data.filter((d: FixTypeLater) => {
      return d.Ministry_Key !== 'BC Population'
    }),
    [{ key: 'Value' }],
    (d: FixTypeLater, obj: FixTypeLater) => {
      if (parseIntClean(d.Value) === 0) hasSuppressedData = true
      const categoryFullName = displayNameByKey('Ministry_Key', d.Ministry_Key)
      let categoryShortName = categoryFullName
      if (categoryShortName && (categoryShortName.length > 37 || width < 576)) {
        categoryShortName = d.Ministry_Key
      }
      obj.category = d.Ministry_Key
      obj.categoryFullName = categoryFullName

      obj.categoryShortName = categoryShortName
    }
  )

  const items = filteredData
    .map((d: FixTypeLater): number[] => {
      return dataKeys.map((e: string): number => +(d as FixTypeLater)[e])
    })
    .flat()

  const maxItem = Math.max(...items, provincialRepresentation + 3)

  const labelCallback = useCallback(() => {
    return horizontalLabel(MARGINS, width, maxItem, (d: FixTypeLater) => {
      return formatPercent(d, 1, 100)
    })
  }, [maxItem, width])

  filteredData.sort((b: FixTypeLater, a: FixTypeLater) =>
    a.Value < b.Value ? 1 : a.Value > b.Value ? -1 : 0
  )

  const graph = (
    <ResponsiveBar
      data={filteredData}
      keys={['Value']}
      indexBy={'categoryShortName'}
      margin={MARGINS}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={color}
      groupMode={'grouped'}
      enableGridX={true}
      enableGridY={false}
      maxValue={maxItem}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      layout={'horizontal'}
      layers={[
        'grid',
        'axes',
        'bars',
        'markers',
        'legends',
        (d) => {
          return (
            <>
              <line
                x1={d.xScale(provincialRepresentation)}
                x2={d.xScale(provincialRepresentation)}
                y1={0}
                y2={d.height}
                width={3}
                stroke={'#666'}
              />
              <text
                x={d.xScale(provincialRepresentation) + 5}
                y={d.height - 10}
                textAnchor={'start'}
                fill={'#666'}
              >
                BC Pop:{' '}
                {provincialRepresentation.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                })}
                %
              </text>
            </>
          )
        },
      ]}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'Values',
        legendPosition: 'middle',
        legendOffset: 32,
        format: (d: FixTypeLater) => d,
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
            {d.data.categoryFullName}: {d.data[d.id]}%
          </div>
        )
      }}
      {...NIVO_BASE_PROPS}
    />
  )

  const legend = (
    <Legend
      items={legendItems}
      notes={
        !hasSuppressedData ? null : (
          <>
            <div className="d-flex align-items-baseline">
              <p className="m-0 text-center mr-2" style={{ minWidth: '25px' }}>
                <b>&lt;3</b>
              </p>
              <p className="mt-0 mb-2">
                Data suppressed because value is less than 3.
              </p>
            </div>
            <div className="d-flex align-items-top">
              <p className="m-0 text-center mr-2" style={{ minWidth: '25px' }}>
                <b>S</b>
              </p>
              <p className="mt-0 mb-1">
                Value is 3 or greater, but is suppressed to prevent residual
                disclosure.
              </p>
            </div>
          </>
        )
      }
    />
  )

  return (
    <GraphFrame
      items={items}
      className={`Ministry-${varKey}`}
      title={`${title} — ${subtitle}`}
      graph={graph}
      legend={legend}
      setWidthCallback={setWidth}
      height={600}
      isOrganizationFrame
    />
  )
}

export default OrganizationSubGraph
