import { useCallback, useMemo } from 'react'
import { ArrayParam, StringParam, useQueryParam } from 'use-query-params'

import { Variable } from '../@types/Variable'
import { VariableGroup } from '../@types/VariableGroup'
import { useDataManager } from '../Data/DataManager'

interface Props {
  useShortDisplay?: boolean
  variable: Variable
  variableGroup: VariableGroup
  isLocked?: boolean
  isDisabled?: boolean
  isActiveOverride?: boolean
}

const VariableItemDisplayExclusive = ({
  useShortDisplay,
  variable,
  variableGroup,
  isLocked,
  isDisabled,
  isActiveOverride,
}: Props): JSX.Element => {
  const [queryVar, setQueryVar] = useQueryParam(variableGroup.key, StringParam)

  if (!queryVar) {
    setQueryVar(variableGroup.default as string)
  }

  if (isActiveOverride) {
    setQueryVar(variable.key)
  }

  const isActive = queryVar === variable.key

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked || isDisabled ? ' locked' : ''}`}
      onClick={() => {
        if (!isLocked) setQueryVar(variable.key)
      }}
    >
      {useShortDisplay ? variable.shortName : variable.name}
    </li>
  )
}

const VariableItemDisplayNonExclusive = ({
  useShortDisplay,
  variable,
  variableGroup,
  isLocked,
  isDisabled,
  isActiveOverride,
}: Props): JSX.Element => {
  const [queryVars, setQueryVars] = useQueryParam(variableGroup.key, ArrayParam)

  if (!queryVars) {
    setQueryVars(variableGroup.default as string[])
  }

  if (isActiveOverride) {
    setQueryVars([variable.key])
  }

  const isActive = queryVars?.includes(variable.key) || false

  const onClickCallbackNonExclusive = useCallback(() => {
    if (!isLocked && !isDisabled) {
      if (isActive && queryVars) {
        // Currently active. Remove from list.
        const newVars = queryVars.filter(
          (queryVar) => queryVar !== variable.key
        )
        setQueryVars(newVars)
      } else {
        // Not currently active. Add to list.
        const newVars = (queryVars || []).concat(variable.key)
        setQueryVars(newVars)
      }
    }
  }, [queryVars, setQueryVars, isLocked, isDisabled, isActive, variable.key])

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked || isDisabled ? ' locked' : ''}`}
      onClick={onClickCallbackNonExclusive}
    >
      {useShortDisplay ? variable.shortName : variable.name}
    </li>
  )
}

const VariableItemDisplay = (props: Props): JSX.Element => {
  const { lockedVars } = useDataManager()
  const { disabledVars } = useDataManager()

  const isLocked = useMemo(() => {
    return (
      lockedVars[props.variableGroup.key] &&
      !lockedVars[props.variableGroup.key].includes(props.variable.key)
    )
  }, [props.variable, props.variableGroup, lockedVars])

  const isDisabled = useMemo(() => {
    return (
      lockedVars[props.variableGroup.key] &&
      !lockedVars[props.variableGroup.key].includes(props.variable.key)
    )
  }, [props.variable, props.variableGroup, disabledVars])

  const isActiveOverride: boolean | undefined = useMemo(() => {
    if (!lockedVars[props.variableGroup.key] || disabledVars[props.variableGroup.key]) return undefined
    if (lockedVars[props.variableGroup.key].includes(props.variable.key) &&
      !disabledVars[props.variableGroup.key].includes(props.variable.key))
      return true
    return false
  }, [props.variable, props.variableGroup, lockedVars, disabledVars])

  if (props.variableGroup.isExclusive) {
    return (
      <VariableItemDisplayExclusive
        isLocked={isLocked}
        isDisabled={isDisabled}
        isActiveOverride={isActiveOverride}
        {...props}
      />
    )
  } else {
    return (
      <VariableItemDisplayNonExclusive
        isLocked={isLocked}
        isDisabled={isDisabled}
        isActiveOverride={isActiveOverride}
        {...props}
      />
    )
  }
}

export default VariableItemDisplay
