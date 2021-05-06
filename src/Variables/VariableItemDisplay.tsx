import React, { useCallback, useEffect, useMemo } from 'react'
import { ArrayParam, StringParam, useQueryParam } from 'use-query-params'

import { Variable } from '../@types/Variable'
import { VariableGroup } from '../@types/VariableGroup'
import { useDataManager } from '../Data/DataManager'

interface Props {
  useShortDisplay?: boolean
  variable: Variable
  variableGroup: VariableGroup
  isLocked?: boolean
  isActiveOverride?: boolean
}

const VariableItemDisplayExclusive = ({
  useShortDisplay,
  variable,
  variableGroup,
  isLocked,
  isActiveOverride,
}: Props): JSX.Element => {
  const [queryVar, setQueryVar] = useQueryParam(variableGroup.key, StringParam)

  // console.log('variableGroup.key', variableGroup.key, 'queryVar', queryVar)

  useEffect(() => {
    console.log(
      '==> variableGroup.key',
      variableGroup.key,
      'queryVar',
      queryVar
    )
    if (!queryVar) {
      console.log(' --> in here', variableGroup.default)
      setQueryVar(variableGroup.default as string)
    }
  }, [queryVar])

  useEffect(() => {
    if (isActiveOverride) {
      console.log(' --> also in here', variable.key)
      setQueryVar(variable.key)
    }
  }, [isActiveOverride])

  const isActive = queryVar === variable.key

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked ? ' locked' : ''}`}
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
  isActiveOverride,
}: Props): JSX.Element => {
  const [queryVars, setQueryVars] = useQueryParam(variableGroup.key, ArrayParam)

  useEffect(() => {
    if (!queryVars) {
      setQueryVars(variableGroup.default as string[])
    }
  }, [queryVars, setQueryVars])

  useEffect(() => {
    if (isActiveOverride) {
      setQueryVars([variable.key])
    }
  }, [isActiveOverride, setQueryVars])

  const isActive = queryVars?.includes(variable.key) || false

  const onClickCallbackNonExclusive = useCallback(() => {
    if (!isLocked) {
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
  }, [queryVars, setQueryVars, isLocked])

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked ? ' locked' : ''}`}
      onClick={onClickCallbackNonExclusive}
    >
      {useShortDisplay ? variable.shortName : variable.name}
    </li>
  )
}

const VariableItemDisplay = (props: Props): JSX.Element => {
  const { lockedVars } = useDataManager()

  const isLocked = useMemo(() => {
    return (
      lockedVars[props.variableGroup.key] &&
      !lockedVars[props.variableGroup.key].includes(props.variable.key)
    )
  }, [props.variable, props.variableGroup, lockedVars])

  const isActiveOverride: boolean | undefined = useMemo(() => {
    if (!lockedVars[props.variableGroup.key]) return undefined
    if (lockedVars[props.variableGroup.key].includes(props.variable.key))
      return true
    return false
  }, [props.variable, props.variableGroup, lockedVars])

  if (props.variableGroup.isExclusive) {
    return (
      <VariableItemDisplayExclusive
        isLocked={isLocked}
        isActiveOverride={isActiveOverride}
        {...props}
      />
    )
  } else {
    return (
      <VariableItemDisplayNonExclusive
        isLocked={isLocked}
        isActiveOverride={isActiveOverride}
        {...props}
      />
    )
  }
}

export default VariableItemDisplay
