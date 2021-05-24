import { useCallback, useMemo } from 'react'
import FixTypeLater from '../@types/FixTypeLater'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'

interface Props {
  width: number
}

export const BASE_AXIS_LEFT_PROPS: FixTypeLater = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legendPosition: 'middle',
  legendOffset: 32,
}

export const useAxisLeft = ({ width }: Props): FixTypeLater => {
  const formatter = useCallback(
    (d: FixTypeLater) =>
      (width < 576
        ? shortDisplayNameByKey('Des_Grp', d)
        : displayNameByKey('Des_Grp', d)) as string,
    [width]
  )

  // Only copy once
  const baseProps = useMemo(() => Object.assign({}, BASE_AXIS_LEFT_PROPS), [])

  baseProps.format = formatter

  return baseProps
}
