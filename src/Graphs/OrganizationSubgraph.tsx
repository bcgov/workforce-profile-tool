/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ResponsiveBar } from '@nivo/bar'
import Color from 'color'
import React, { useState } from 'react'

import { BASE_AXIS_LEFT_PROPS } from './useAxisLeft'
import { DataDefinition } from '../@types/DataDefinition'
import {
  GRAPH_DEFAULT_WIDTH,
  GRAPH_WIDTH_BREAKPOINT,
  NIVO_BASE_PROPS,
  processDataForGraph,
} from '../Helpers/graphs'
import { displayNameByKey, useDataManager } from '../Data/DataManager'
import { formatPercent, parseIntClean } from '../Helpers/formatter'
import { labelValue } from './labels'
import { MinistryRawData } from '../@types/DataTypes'
import FixTypeLater from '../@types/FixTypeLater'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import useGraph from '../Helpers/useGraph'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { definitionsForYear } from '../Table/Definitions'

interface SubgraphProps {
  color?: string
  data: MinistryRawData[]
  dataDictionary: DataDictionaryEntry[]
  shortTitle?: string
  title?: string
  varKey?: FixTypeLater
}

const MARGINS = { top: 0, right: 60, bottom: 50, left: 255 }

const OrganizationSubGraph = ({
  color,
  data,
  dataDictionary,
  title,
  varKey,
}: SubgraphProps): JSX.Element => {
  const { queryValues, year } = useDataManager()

  const [width, setWidth] = useState(GRAPH_DEFAULT_WIDTH)

  MARGINS.left = width < GRAPH_WIDTH_BREAKPOINT ? 80 : 255

  const provincialRepresentation = parseFloat(
    data.find((d) => d.Ministry_Key === 'BC Population')!.Value
  )

  let hasSuppressedData = false

  const legendItems: DataDefinition<FixTypeLater>[] = [
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
    data.filter((d) => d.Ministry_Key !== 'BC Population'),
    [{ key: 'Value' }] as FixTypeLater[],
    (d: FixTypeLater, obj: FixTypeLater) => {
      if (parseIntClean(d.Value) === 0) hasSuppressedData = true
      const categoryFullName = displayNameByKey('Ministry_Key', d.Ministry_Key)
      let categoryShortName = categoryFullName
      if (
        categoryShortName &&
        (categoryShortName.length > 37 || width < GRAPH_WIDTH_BREAKPOINT)
      ) {
        categoryShortName = d.Ministry_Key
      }
      obj.category = d.Ministry_Key
      obj.categoryFullName = categoryFullName

      obj.categoryShortName = categoryShortName
    }
  )

  filteredData.sort((b: FixTypeLater, a: FixTypeLater) =>
    a.Value < b.Value ? 1 : a.Value > b.Value ? -1 : 0
  )

  const { maxItem, labelCallback, items } = useGraph({
    data: filteredData,
    dataKeys,
    maxItemComparator: provincialRepresentation + 3,
    width,
    formatter: (d) => formatPercent(d, 1, 100),
    margins: MARGINS,
    bottomAxisText: '% representation',
    dataDefinitions: legendItems,
  })

  if (!data) return <div>&nbsp;</div>

  const graph = (
    <ResponsiveBar
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
      axisLeft={Object.assign(
        { format: (d: FixTypeLater) => d },
        BASE_AXIS_LEFT_PROPS
      )}
      colors={color}
      data={filteredData}
      keys={['Value']}
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
      margin={MARGINS}
      maxValue={maxItem}
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
      // Override NIVO_BASE_PROPS; these MUST come after the line above
      indexBy={'categoryShortName'}
    />
  )

  const legend = (
    <Legend
      items={legendItems}
      dataDictionary={dataDictionary}
      notes={
        !hasSuppressedData ? null : (
          <>
            {definitionsForYear(year).map((item) => (
              <div key={item.term} className="d-flex align-items-baseline">
                <p
                  className="m-0 text-center mr-2"
                  style={{ minWidth: '25px' }}
                >
                  <b>{item.term}</b>
                </p>
                <p className="mt-0 mb-2">{item.definition}</p>
              </div>
            ))}
          </>
        )
      }
    />
  )

  return (
    <GraphFrame
      className={`Ministry-${varKey}`}
      graph={graph}
      height={600}
      isOrganizationFrame
      items={items}
      legend={legend}
      setWidthCallback={setWidth}
      title={`${title} — ${subtitle}`}
    />
  )
}

export default OrganizationSubGraph
