/* globals $ */

import { useEffect, useRef } from 'react'

import './Tooltip.scss'

interface Props {
  /** The text of the tooltip. */
  text: string | undefined
}

interface TooltipShim {
  tooltip: () => void
}

/** A Bootstrap tooltip for showing additional information upon hover. */
const Tooltip = ({ text }: Props): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Enable the Bootstrap tooltip using jQuery.
    if (tooltipRef.current) {
      const tooltip = $(tooltipRef.current) as unknown as TooltipShim
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
