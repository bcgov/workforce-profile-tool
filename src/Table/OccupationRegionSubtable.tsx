import React from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { OccupationRegionRawData } from '../@types/DataTypes'
import { OccupationRegionEnum } from '../Views/OccupationRegion'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'
import TableTooltip from './TableTooltip'

interface Props {
  data: OccupationRegionRawData[]
  shortTitle?: string
}

interface Props {
  viewType: OccupationRegionEnum
}

const RegionOccupationSubtable = ({
  data,
  shortTitle,
  viewType,
}: Props): JSX.Element => {
  const totalRow = data.filter((d) => d['Variable_Type'] === 'Total')

  const filteredData = data.filter((d) => d.Variable_Type === viewType)

  const columns: ColumnWithClassNameAndFooter<OccupationRegionRawData>[] = [
    {
      id: `${viewType}_Region_Group`,
      Header: `${viewType}`,
      Footer: () => `Total`,
      accessor: (d) => d[`Occupation_Region_Group`],
    },
    {
      id: `DesGrp_Count_ORG`,
      Header: shortTitle,
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_ORG),
      accessor: (d) => formatNumber(d[`DesGrp_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `NonDesGrp_Count_ORG`,
      Header: `Non-${shortTitle}`,
      Footer: () => formatNumber(totalRow[0].NonDesGrp_Count_ORG),
      accessor: (d) => formatNumber(d[`NonDesGrp_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `Total_Count_ORG`,
      Header: <TableTooltip title="Total" tooltipKey="representation-total" />,
      Footer: () => formatNumber(totalRow[0].Total_Count_ORG),
      accessor: (d) => formatNumber(d[`Total_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `DesGrp_Percent_ORG`,
      Header: `Rate of ${shortTitle}`,
      Footer: () => formatPercent(totalRow[0].DesGrp_Percent_ORG, 1, 100),
      accessor: (d) => formatPercent(d[`DesGrp_Percent_ORG`], 1, 100),
      className: `text-right`,
    },
    {
      id: `DesGrp_Percent_AvailableWorkforce`,
      Header: (
        <TableTooltip
          title={`${shortTitle} as % of Available Workforce`}
          tooltipKey="representation-available-workforce"
        />
      ),
      Footer: () =>
        formatPercent(totalRow[0].DesGrp_Percent_AvailableWorkforce, 1, 100),
      accessor: (d) =>
        formatPercent(d[`DesGrp_Percent_AvailableWorkforce`], 1, 100),
      className: `text-right`,
    },
    {
      id: `DesGrp_Count_Expected`,
      Header: (
        <TableTooltip
          title={`Expected # ${shortTitle}`}
          tooltipKey="representation-expected"
        />
      ),
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Expected, ``),
      accessor: (d) => formatNumber(d[`DesGrp_Count_Expected`], ``),
      className: `text-right`,
    },
    {
      id: `DesGrp_Count_Shortfall`,
      Header: (
        <TableTooltip
          title={`Shortfall of ${shortTitle}`}
          tooltipKey="representation-shortfall"
        />
      ),
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Shortfall, ``),
      accessor: (d) => formatNumber(d[`DesGrp_Count_Shortfall`], ``),
      className: `text-right`,
    },
  ]

  const allRows = filteredData.concat(totalRow)

  return (
    <div className={`${viewType}Table`}>
      <GenericTable
        columns={columns}
        data={filteredData}
        hideDefinitions
        showFooter
      />
      <DownloadDataLink columns={columns} rows={allRows} filename={viewType} />
      <Definitions />
    </div>
  )
}

export default RegionOccupationSubtable
