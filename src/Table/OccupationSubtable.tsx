import React from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
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

  const columns: ColumnWithClassNameAndFooter<OccupationRegionRawData>[] = [
    {
      id: 'Occupation_Region_Group',
      Header: 'Occupation',
      Footer: () => 'Total',
      accessor: (d) => d['Occupation_Region_Group'],
    },
    {
      id: 'DesGrp_Count_ORG',
      Header: shortTitle,
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_ORG),
      accessor: (d) => formatNumber(d['DesGrp_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'NonDesGrp_Count_ORG',
      Header: `Non-${shortTitle}`,
      Footer: () => formatNumber(totalRow[0].NonDesGrp_Count_ORG),
      accessor: (d) => formatNumber(d['NonDesGrp_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'Total_Count_ORG',
      Header: (
        <span>
          Total &nbsp;
          <Tooltip
            key={Date.now()}
            text={getTooltip('representation-total', year)}
          />
        </span>
      ),
      Footer: () => formatNumber(totalRow[0].Total_Count_ORG),
      accessor: (d) => formatNumber(d['Total_Count_ORG']),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Percent_ORG',
      Header: `Rate of ${shortTitle}`,
      Footer: () => formatPercent(totalRow[0].DesGrp_Percent_ORG, 1, 100),
      accessor: (d) => formatPercent(d['DesGrp_Percent_ORG'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Percent_AvailableWorkforce',
      Header: (
        <span>
          {shortTitle} as % of Available Workforce &nbsp;
          <Tooltip
            key={Date.now()}
            text={getTooltip('representation-available-workforce', year)}
          />
        </span>
      ),
      Footer: () =>
        formatPercent(totalRow[0].DesGrp_Percent_AvailableWorkforce, 1, 100),
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
          <Tooltip
            key={Date.now()}
            text={getTooltip('representation-expected', year)}
          />
        </span>
      ),
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Expected, ''),
      accessor: (d) => formatNumber(d['DesGrp_Count_Expected'], ''),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Count_Shortfall',
      Header: (
        <span>
          Shortfall of {shortTitle}
          {getTooltip('representation-shortfall', year) && (
            <>
              &nbsp;
              <Tooltip
                key={Date.now()}
                text={getTooltip('representation-shortfall', year)}
              />
            </>
          )}
        </span>
      ),
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Shortfall, ''),
      accessor: (d) => formatNumber(d['DesGrp_Count_Shortfall'], ''),
      className: 'text-right',
    },
  ]

  // TODO: Add table footers to GenericTable

  const allRows = filteredData.concat(totalRow)

  return (
    <div className="OccupationTable">
      {/* <h3>Management</h3> */}
      <GenericTable
        columns={columns}
        data={filteredData}
        hideDefinitions
        showFooter
      />
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
