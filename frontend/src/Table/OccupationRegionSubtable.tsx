import { ColumnWithClassNameandFooter } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { OccupationRegionEnum } from '../Views/OccupationRegion'
import { OccupationRegionRawData } from '../@types/DataTypes'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import { DataKeyEnum } from '../@types/DataKeyEnum'

interface Props {
  data: OccupationRegionRawData[]
  dataDictionary: DataDictionaryEntry[]
  shortTitle?: string
  viewType: OccupationRegionEnum
  year: string | undefined
  designatedGroupKey?: string
}

const RegionOccupationSubtable = ({
  data,
  dataDictionary,
  shortTitle,
  viewType,
  year,
  designatedGroupKey,
}: Props): JSX.Element => {
  const totalRow = data.filter((d) => d['Variable_Type'] === 'Total')

  const filteredData = data.filter((d) => d.Variable_Type === viewType)

  const columns: ColumnWithClassNameandFooter<OccupationRegionRawData>[] = [
    {
      id: `${viewType}_Region_Group`,
      Header: `${viewType}`,
      Footer: () => `Total` as FixTypeLater,
      accessor: (d) => d[`Occupation_Region_Group`],
    },
    {
      id: `DesGrp_Count_ORG`,
      Header: shortTitle,
      Footer: () => formatNumber(totalRow[0].DesGrp_Count_ORG) as FixTypeLater,
      accessor: (d) => formatNumber(d[`DesGrp_Count_ORG`]),
      className: `text-end`,
    },
    {
      id: `NonDesGrp_Count_ORG`,
      Header: `Non-${shortTitle}`,
      Footer: () =>
        formatNumber(totalRow[0].NonDesGrp_Count_ORG) as FixTypeLater,
      accessor: (d) => formatNumber(d[`NonDesGrp_Count_ORG`]),
      className: `text-end`,
    },
    {
      id: `Total_Count_ORG`,
      Header: 'Total',
      Footer: () => formatNumber(totalRow[0].Total_Count_ORG) as FixTypeLater,
      accessor: (d) => formatNumber(d[`Total_Count_ORG`]),
      className: `text-end`,
    },
    {
      id: `DesGrp_Percent_ORG`,
      Header: `Rate of ${shortTitle}`,
      Footer: () =>
        formatPercent(totalRow[0].DesGrp_Percent_ORG, 1, 100) as FixTypeLater,
      accessor: (d) => formatPercent(d[`DesGrp_Percent_ORG`], 1, 100),
      className: `text-end`,
    },
    {
      id: `DesGrp_Percent_AvailableWorkforce`,
      Header: `${shortTitle} as % of Available Workforce`,
      Footer: () =>
        formatPercent(totalRow[0].DesGrp_Percent_AvailableWorkforce, 1, 100),
      accessor: (d) =>
        formatPercent(d[`DesGrp_Percent_AvailableWorkforce`], 1, 100),
      className: `text-end`,
    },
    {
      id: `DesGrp_Count_Expected`,
      Header: `Expected # ${shortTitle}`,
      Footer: () =>
        formatNumber(totalRow[0].DesGrp_Count_Expected, ``) as FixTypeLater,
      accessor: (d) => formatNumber(d[`DesGrp_Count_Expected`], ``),
      className: `text-end`,
    },
    {
      id: `DesGrp_Count_Shortfall`,
      Header: `Shortfall of ${shortTitle}`,
      Footer: () =>
        formatNumber(totalRow[0].DesGrp_Count_Shortfall, ``) as FixTypeLater,
      accessor: (d) => formatNumber(d[`DesGrp_Count_Shortfall`], ``),
      className: `text-end`,
    },
  ]

  const allRows = filteredData.concat(totalRow)

  const additionalDefinitions =
    year === '2022' && designatedGroupKey && designatedGroupKey === 'WOM'
      ? [
        {
          term: 'Note',
          definition:
            'Some ministries have had their Women counts adjusted slightly to prevent additional residual disclosure. These adjustments are very minimal and do not affect total counts.',
        },
      ]
      : []

  const { queryValues } = useDataManager()

  return (
    <div className={`${viewType}Table`}>
      <GenericTable
        columns={columns}
        data={filteredData}
        dataDictionary={dataDictionary}
        hideDefinitions
        showFooter
      />
      <DownloadDataLink
        columns={columns}
        rows={allRows}
        // filename includes filters
        // YYYY-Organization-EmployeeType-DesignatedGroup
        filename={`${queryValues.Year}-${queryValues.Ministry_Key}-${queryValues.Employee_Type}-${queryValues.Des_Grp.join('_')}-${viewType}`}
        additionalDefinitions={additionalDefinitions}
      />
      <Definitions additionalDefinitions={additionalDefinitions} />
    </div>
  )
}

export default RegionOccupationSubtable
