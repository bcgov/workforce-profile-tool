/* globals $ */

import React, { Component } from 'react'

import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  text: string | undefined
}

class Tooltip extends Component<Props> {
  private tooltip: FixTypeLater

  componentDidMount(): void {
    const tooltip = $(this.tooltip) as FixTypeLater
    tooltip.tooltip()
  }

  render(): JSX.Element {
    return (
      <span
        className="Tooltip"
        ref={(tooltip) => {
          this.tooltip = tooltip
        }}
        data-toggle="tooltip"
        title={`${this.props.text}`}
        data-placement="bottom"
        data-html="true"
      >
        <i className="fas fa-info-circle" />
      </span>
    )
  }
}

export default Tooltip
