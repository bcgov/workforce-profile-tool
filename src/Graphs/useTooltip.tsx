import { TooltipProp } from '@nivo/bar'
import Color from 'color'
import React, { useCallback } from 'react'

import { DataDefinition } from '../@types/DataDefinition'
import { displayNameByKey } from '../Data/DataManager'

interface Props<T> {
  dataDefinitions: DataDefinition<T>[]
  formatter: (s: string) => string
}

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
