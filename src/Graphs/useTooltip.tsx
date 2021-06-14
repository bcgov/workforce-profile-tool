import { TooltipProp } from '@nivo/bar'
import Color from 'color'
import React, { useCallback } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { displayNameByKey } from '../Data/DataManager'

interface Props<T> {
  /** The data definitions for the columns in the chart. The hook will find the
   * appropriate data definition for the data in question.
   */
  dataDefinitions: DataDefinition<T>[]
  /** A formatter for the data value. */
  formatter: (s: string) => string
}

/** Hook to provide a tooltip on a Nivo chart (i.e. when the bar on the chart is
 * hovered over). */
export const useTooltip = <T,>({
  dataDefinitions,
  formatter,
}: Props<T>): TooltipProp => {
  const baseProps = useCallback(
    (d): JSX.Element => {
      return (
        <div style={{ color: Color(d.color).darken(0.3).hex() }}>
          {displayNameByKey('Des_Grp', d.indexValue)},{' '}
          {dataDefinitions.find((dd) => dd.key === d.id)?.label}:{' '}
          {formatter(d.data[d.id])}
        </div>
      )
    },
    [dataDefinitions]
  )

  return baseProps
}
