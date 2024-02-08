import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { FlowRawData } from '../@types/DataTypes'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import GenericTable from './GenericTable'

interface Props {
  data: FlowRawData[]
  dataDictionary: DataDictionaryEntry[]
  shortTitle?: string
}

const FlowReportSubtable = ({
  data,
  dataDictionary,
  shortTitle,
}: Props): JSX.Element => {
  const columns: ColumnWithClassName<FlowRawData>[] = [
    {
      id: 'Variable_Type',
      Header: 'Flow Type',
      accessor: (d) => d['Variable_Type'] || '',
    },
    {
      id: 'Display_Type',
      Header: 'Move Type',
      accessor: (d) => d['Display_Type'] || '',
    },
    {
      id: `DesGrp_Count_ORG`,
      Header: shortTitle,
      accessor: (d) => formatNumber(d[`DesGrp_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `NonDesGrp_Count_ORG`,
      Header: `Non-${shortTitle}`,
      accessor: (d) => formatNumber(d[`NonDesGrp_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `Total_Count_ORG`,
      Header: 'Total',
      accessor: (d) => formatNumber(d[`Total_Count_ORG`]),
      className: `text-right`,
    },
    {
      id: `RateOfDesGrp`,
      Header: `Rate of ${shortTitle}`,
      accessor: (d) => {
        const desGrp = parseFloat(d[`DesGrp_Count_ORG`])
        const nonDesGrp = parseFloat(d[`NonDesGrp_Count_ORG`])
        if (isNaN(desGrp) || isNaN(nonDesGrp)) {
          return ''
        } else {
          return formatPercent(desGrp / (desGrp + nonDesGrp), 1)
        }
      },
      className: `text-right`,
    },
  ]

  return (
    <div>
      <GenericTable
        columns={columns}
        data={data}
        dataDictionary={dataDictionary}
        hideDefinitions
      />
      <DownloadDataLink
        columns={columns}
        rows={data}
        filename={`flow-${shortTitle?.toLowerCase()}`}
      />
      <Definitions />
    </div>
  )
}

export default FlowReportSubtable
