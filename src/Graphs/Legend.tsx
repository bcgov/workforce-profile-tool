import React from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import Tooltip from '../Core/Tooltip'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { getTooltip } from '../Helpers/tooltipHelper'

import './Legend.scss'

interface Props<T> {
  /** The chart columns that need legend entries. */
  items: DataDefinition<T>[]
  /** A data dictionary, for showing items needing tooltips. */
  dataDictionary: DataDictionaryEntry[]
  /** Any additional notes to display in the legend. */
  notes?: React.ReactNode
}

/** The legend on the side of the chart. */
const Legend = <T,>({
  items,
  dataDictionary,
  notes,
}: Props<T>): JSX.Element => {
  const rows = items.map((item) => {
    //const tooltip = dataDictionary.find((d) => d.columnKey === item.key)?.note
    const tooltip = getTooltip(`${item.key}`, dataDictionary)
    return (
      <div key={item.color} className={'d-flex align-items-top'}>
        <div className="swatch">
          <span style={{ color: item.color }}>●</span>
        </div>
        <div className="label">
          {item.label}
          {tooltip && (
            <span>
              &nbsp;
              <Tooltip text={tooltip} />
            </span>
          )}
        </div>
      </div>
    )
  })

  // TODO: Fix Date.now() as key, and invalidate props properly
  return (
    <div className="Legend Shadow" key={Date.now()}>
      <h1>Legend</h1>
      <div className="LegendRows">{rows}</div>
      {notes && <div className="Notes">{notes}</div>}
    </div>
  )
}

export default Legend
