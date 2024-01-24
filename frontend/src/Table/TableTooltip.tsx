import { DataDictionaryEntry } from '../Data/useDataQuery'
import { getTooltip } from '../Helpers/tooltipHelper'
import Tooltip from '../Core/Tooltip'

interface Props {
  dataDictionary: DataDictionaryEntry[]
  tooltipKey: string
}

const TableTooltip = ({ dataDictionary, tooltipKey }: Props): JSX.Element => {
  const tooltipText = getTooltip(tooltipKey, dataDictionary)
  const tooltip = tooltipText ? <Tooltip text={tooltipText} /> : <></>

  return <span>&nbsp;{tooltip}</span>
}

export default TableTooltip
