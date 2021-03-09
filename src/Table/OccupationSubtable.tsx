import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { formatNumber, formatPercent } from '../Services/formatter'
import { OccupationRegionRawData } from '../@types/DataTypes'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'
import Tooltip from '../Core/Tooltip'
import Definitions from './Definitions'

interface Props {
  data: OccupationRegionRawData[]
  shortTitle?: string
}

const OccupationSubtable = ({ data, shortTitle }: Props): JSX.Element => {
  const managementRows = data.filter((d) => d.Occupation_Type === 'Management')
  const managementSubtotal = data.filter(
    (d) => d.Occupation_Type === 'SubTotal_Mngt'
  )
  const nonManagementRows = data.filter(
    (d) => d.Occupation_Type === 'NonManagement'
  )
  const nonManagementSubtotal = data.filter(
    (d) => d.Occupation_Type === 'SubTotal_NonMngt'
  )
  const totalRow = data.filter((d) => d['Occupation_Type'] === 'Total')

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
          <Tooltip
            text={`Total includes all members of the population, including non-respondents and employees for whom there is no relevant demographic data available.`}
          />
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
            text={`The representation of visible minorities in the BC Workforce according to Statistics Canada's 2011 National Household Survey. The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Public Service, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Public Service.`}
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
          <Tooltip
            text={`Shortfall numbers are only shown when the shortfall is equal to or greater than 30 employees or 20% of the expected number, where:
          <br />Expected Number = (Available Workforce Representation x Total in Occupation), and
          <br />Shortfall = Expected Number - Visible Minority.
          <br />Shortfall must be at least 2 to be considered a "significantly under-represented" occupation.</span>`}
          />
        </span>
      ),
      accessor: (d) => formatNumber(d['DesGrp_Count_Expected'], ''),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Count_Shortfall',
      Header: `Shortfall of ${shortTitle}`,
      accessor: (d) => formatNumber(d['DesGrp_Count_Shortfall'], ''),
      className: 'text-right',
    },
  ]

  // TODO: Add table footers to GenericTable

  const allRows = managementRows
    .concat(managementSubtotal)
    .concat(nonManagementRows)
    .concat(nonManagementSubtotal)
    .concat(totalRow)

  return (
    <div className="OccupationSubtable">
      <h3>Management</h3>
      <GenericTable columns={columns} data={managementRows} hideDefinitions />
      <h3>Non-Management</h3>
      <GenericTable
        columns={columns}
        data={nonManagementRows}
        hideDefinitions
      />
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