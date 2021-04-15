import React from 'react'

import Tooltip from '../Core/Tooltip'
import { useDataManager } from '../Data/DataManager'
import { getTooltip } from '../Helpers/tooltipHelper'

interface Props {
  title: string
  tooltipKey: string
}

const TableTooltip = ({ title, tooltipKey }: Props): JSX.Element => {
  const { year = '' } = useDataManager()

  const tooltipText = getTooltip(tooltipKey, year)
  const tooltip = tooltipText ? (
    <Tooltip key={Date.now()} text={tooltipText} />
  ) : (
    <></>
  )

  return (
    <span>
      {title} &nbsp;{tooltip}
    </span>
  )
}

export default TableTooltip
