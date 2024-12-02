/* globals $ */

import { useEffect, useRef } from 'react'

import './Tooltip.scss'

interface Props {
  /** The text of the tooltip. */
  text: string | undefined
}

/*interface TooltipShim {
  tooltip: () => void
}*/

declare global {
  interface JQuery {
    tooltip(options?: any): JQuery;
  }
}

/** A Bootstrap tooltip for showing additional information upon hover. */
const Tooltip = ({ text }: Props): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Enable the Bootstrap tooltip using jQuery.
    if (tooltipRef.current) {
      //const tooltip = $(tooltipRef.current) as unknown as TooltipShim
      const $tooltip = $(tooltipRef.current);
      $tooltip.tooltip({
        container: 'body',
        html: true,
      });
    }

    return () => {
      if (tooltipRef.current) {
        const $tooltip = $(tooltipRef.current);
        $tooltip.tooltip('dispose');
      }
    };

  }, [text])

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
