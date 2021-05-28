/* globals $ */

import React, { useEffect, useRef } from 'react'

import './Tooltip.scss'

interface Props {
  text: string | undefined
}

interface TooltipShim {
  tooltip: () => void
}

const Tooltip = ({ text }: Props): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Enable the Bootstrap tooltip using jQuery
    if (tooltipRef.current) {
      const tooltip = ($(tooltipRef.current) as unknown) as TooltipShim
      tooltip.tooltip()
    }
  }, [])

  return (
    <span
      className="Tooltip"
      data-html="true"
      data-placement="bottom"
      data-toggle="tooltip"
      ref={tooltipRef}
      title={text}
    >
      <i className="fas fa-info-circle" />
    </span>
  )
}

export default Tooltip
