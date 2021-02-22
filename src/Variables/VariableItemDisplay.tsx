import React, { useCallback, useEffect } from 'react'
import { ArrayParam, StringParam, useQueryParam } from 'use-query-params'

import { Variable } from './Variable'
import { VariableGroup } from './VariableGroup'

interface Props {
  useShortDisplay?: boolean
  variable: Variable
  variableGroup: VariableGroup
}

const VariableItemDisplayExclusive = ({
  useShortDisplay,
  variable,
  variableGroup,
}: Props): JSX.Element => {
  const [queryVar, setQueryVar] = useQueryParam(variableGroup.key, StringParam)

  useEffect(() => {
    if (!queryVar) setQueryVar(variableGroup.defaultSelected as string)
  }, [queryVar])

  const isActive = queryVar === variable.key
  const isLocked = false

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked ? ' locked' : ''}`}
      onClick={() => {
        setQueryVar(variable.key)
      }}
    >
      {useShortDisplay ? variable.shortDisplay : variable.display}
    </li>
  )
}

const VariableItemDisplayNonExclusive = ({
  useShortDisplay,
  variable,
  variableGroup,
}: Props): JSX.Element => {
  const [queryVars, setQueryVars] = useQueryParam(variableGroup.key, ArrayParam)

  useEffect(() => {
    if (!queryVars) setQueryVars(variableGroup.defaultSelected as string[])
  }, [queryVars])

  const isActive = queryVars?.includes(variable.key) || false
  const isLocked = false

  const onClickCallbackNonExclusive = useCallback(() => {
    if (isActive && queryVars) {
      // Currently active. Remove from list.
      const newVars = queryVars.filter((queryVar) => queryVar !== variable.key)
      setQueryVars(newVars)
    } else {
      // Not currently active. Add to list.
      const newVars = (queryVars || []).concat(variable.key)
      setQueryVars(newVars)
    }
  }, [queryVars, setQueryVars])

  return (
    <li
      key={variable.key}
      className={`${isActive ? ' active' : ''} ${isLocked ? ' locked' : ''}`}
      onClick={onClickCallbackNonExclusive}
    >
      {useShortDisplay ? variable.shortDisplay : variable.display}
    </li>
  )
}

const VariableItemDisplay = (props: Props): JSX.Element => {
  if (props.variableGroup.exclusive) {
    return <VariableItemDisplayExclusive {...props} />
  } else {
    return <VariableItemDisplayNonExclusive {...props} />
  }
}

export default VariableItemDisplay
