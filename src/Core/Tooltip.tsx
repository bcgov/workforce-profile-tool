/* globals $ */

import React, { useEffect, useRef } from 'react'

import FixTypeLater from '../@types/FixTypeLater'

import './Tooltip.scss'

interface Props {
  text: string | undefined
}

const Tooltip = ({ text }: Props): JSX.Element => {
  // TODO: Grab the tooltip key here

  const tooltipRef = useRef<FixTypeLater>()

  useEffect(() => {
    // Enable the Bootstrap tooltip using jQuery
    const tooltip = $(tooltipRef.current) as FixTypeLater
    tooltip.tooltip()
  }, [])

  return (
    <span
      className="Tooltip"
      ref={tooltipRef}
      data-toggle="tooltip"
      title={text}
      data-placement="bottom"
      data-html="true"
    >
      <i className="fas fa-info-circle" />
    </span>
  )
}

export default Tooltip
