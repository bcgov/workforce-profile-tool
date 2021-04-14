import React from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { OccupationRegionRawData } from '../@types/DataTypes'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'
import Tooltip from '../Core/Tooltip'
import { useDataManager } from '../Data/DataManager'

interface Props {
  data: OccupationRegionRawData[]
  shortTitle?: string
}

const RegionSubtable = ({ data, shortTitle }: Props): JSX.Element => {
  const totalRow = data.filter((d) => d['Variable_Type'] === 'Total')

  const { year = '' } = useDataManager()

  const filteredData = data.filter((d) => d.Variable_Type === 'Region')

  const columns: ColumnWithClassNameAndFooter<OccupationRegionRawData>[] = [
    {
      id: 'Occupation_Region_Group',
      Header: 'Region',
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
            text={`Total includes all members of the population, including non-respondents and employees for whom there is no relevant demographic data available.`}
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
            text={`The representation of visible minorities in the BC Workforce according to Statistics Canada's 2011 National Household Survey. The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Public Service, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Public Service.`}
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
            text={`Shortfall numbers are only shown when the shortfall is equal to or greater than 30 employees or 20% of the expected number, where:
            <br />Expected Number = (Available Workforce Representation x Total in Occupation), and
            <br />Shortfall = Expected Number - Visible Minority.
            <br />Shortfall must be at least 2 to be considered a "significantly under-represented" occupation.</span>`}
          />
        </span>
      ),
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Expected, ''),
      accessor: (d) => formatNumber(d['DesGrp_Count_Expected'], ''),
      className: 'text-right',
    },
    {
      id: 'DesGrp_Count_Shortfall',
      Header: `Shortfall of ${shortTitle}`,
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Shortfall, ''),
      accessor: (d) => formatNumber(d['DesGrp_Count_Shortfall'], ''),
      className: 'text-right',
    },
  ]

  const allRows = filteredData.concat(totalRow)

  return (
    <div className="RegionTable">
      <GenericTable
        columns={columns}
        data={filteredData}
        hideDefinitions
        showFooter
      />
      <DownloadDataLink columns={columns} rows={allRows} filename={'region'} />
      <Definitions />
    </div>
  )
}

export default RegionSubtable
