import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { OccupationRegionRawData } from '../@types/DataTypes'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'
import Tooltip from '../Core/Tooltip'
import Definitions from './Definitions'
import { useDataManager } from '../Data/DataManager'
import { getTooltip } from '../Data/tooltipHelper'

interface Props {
  data: OccupationRegionRawData[]
  shortTitle?: string
}

const OccupationSubtable = ({ data, shortTitle }: Props): JSX.Element => {
  const totalRow = data.filter((d) => d['Variable_Type'] === 'Total')

  const { year = '' } = useDataManager()

  const filteredData = data.filter((d) => d.Variable_Type === 'Occupation')

  const columns: ColumnWithClassName<OccupationRegionRawData>[] = [
    {
      id: 'Occupation_Region_Group',
      Header: 'Occupation',
      accessor: (d) => d['Occupation_Region_Group'],
    },
    {
      id: 'DesGrp_Count_ORG',
      Header: shortTitle,
      accessor: (d) => formatNumber(d['DesGrp_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'NonDesGrp_Count_ORG',
      Header: `Non-${shortTitle}`,
      accessor: (d) => formatNumber(d['NonDesGrp_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'Total_Count_ORG',
      Header: (
        <span>
          Total &nbsp;
          <Tooltip text={getTooltip('representation-total', year)} />
        </span>
      ),
      accessor: (d) => formatNumber(d['Total_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Percent_ORG',
      Header: `Rate of ${shortTitle}`,
      accessor: (d) => formatPercent(d['DesGrp_Percent_ORG'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Percent_AvailableWorkforce',
      Header: (
        <span>
          {shortTitle} as % of Available Workforce &nbsp;
          <Tooltip
            text={getTooltip('representation-available-workforce', year)}
          />
        </span>
      ),
      accessor: (d) =>
        formatPercent(d['DesGrp_Percent_AvailableWorkforce'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Count_Expected',
      Header: (
        <span>
          Expected # {shortTitle}
          &nbsp;
          <Tooltip text={getTooltip('representation-expected', year)} />
        </span>
      ),
      accessor: (d) => formatNumber(d['DesGrp_Count_Expected'], ''),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Count_Shortfall',
      Header: (
        <span>
          Shortfall of {shortTitle}
          {getTooltip('representation-expected', year) && (
            <>
              &nbsp;
              <Tooltip text={getTooltip('representation-expected', year)} />
            </>
          )}
        </span>
      ),
      accessor: (d) => formatNumber(d['DesGrp_Count_Shortfall'], ''),
      className: 'text-right',
    },
  ]

  // TODO: Add table footers to GenericTable

  const allRows = filteredData.concat(totalRow)

  return (
    <div className="OccupationSubtable">
      {/* <h3>Management</h3> */}
      <GenericTable columns={columns} data={filteredData} hideDefinitions />
      <GenericTable columns={columns} data={totalRow} hideDefinitions />
      <DownloadDataLink
        columns={columns}
        rows={allRows}
        filename={'occupation'}
      />
      <Definitions />
    </div>
  )
}

export default OccupationSubtable
