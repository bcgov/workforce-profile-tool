import React from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import Tooltip from '../Core/Tooltip'

import './Legend.scss'

interface Props<T> {
  /** The chart columns that need legend entries. */
  items: DataDefinition<T>[]
  /** Any additional notes to display in the legend. */
  notes?: React.ReactNode
}

/** The legend on the side of the chart. */
const Legend = <T,>({ items, notes }: Props<T>): JSX.Element => {
  const rows = items.map((item) => {
    return (
      <div key={item.color} className={'d-flex align-items-top'}>
        <div className="swatch">
          <span style={{ color: item.color }}>●</span>
        </div>
        <div className="label">
          {item.label}
          {item.tooltip && (
            <span>
              &nbsp;
              <Tooltip text={item.tooltip} />
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
