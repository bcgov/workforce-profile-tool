import React from 'react'

import { ColumnWithClassNameandFooter } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { OccupationRegionEnum } from '../Views/OccupationRegion'
import { OccupationRegionRawData } from '../@types/DataTypes'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'

interface Props {
  data: OccupationRegionRawData[]
  dataDictionary: DataDictionaryEntry[]
  shortTitle?: string
}

interface Props {
  viewType: OccupationRegionEnum
}

const RegionOccupationSubtable = ({
  data,
  dataDictionary,
  shortTitle,
  viewType,
}: Props): JSX.Element => {
  const totalRow = data.filter((d) => d['Variable_Type'] === 'Total')

  const filteredData = data.filter((d) => d.Variable_Type === viewType)

  const columns: ColumnWithClassNameandFooter<OccupationRegionRawData>[] = [
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
      Header: 'Total',
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
      Header: `${shortTitle} as % of Available Workforce`,
      Footer: () =>
        formatPercent(totalRow[0].DesGrp_Percent_AvailableWorkforce, 1, 100),
      accessor: (d) =>
        formatPercent(d[`DesGrp_Percent_AvailableWorkforce`], 1, 100),
      className: `text-right`,
    },
    {
      id: `DesGrp_Count_Expected`,
      Header: `Expected # ${shortTitle}`,
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_Expected, ``),
      accessor: (d) => formatNumber(d[`DesGrp_Count_Expected`], ``),
      className: `text-right`,
    },
    {
      id: `DesGrp_Count_Shortfall`,
      Header: `Shortfall of ${shortTitle}`,
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
        dataDictionary={dataDictionary}
        hideDefinitions
        showFooter
      />
      <DownloadDataLink columns={columns} rows={allRows} filename={viewType} />
      <Definitions />
    </div>
  )
}

export default RegionOccupationSubtable
