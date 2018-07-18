import React, { Component } from 'react'
import * as saveSVG from 'save-svg-as-png'

import FilterNotes from './FilterNotes'

import './Graphs.css'

class GraphFrame extends Component {
  constructor (props) {
    super(props)
    this.saveSVGAsPNG = this.saveSVGAsPNG.bind(this)
  }

  saveSVGAsPNG () {
    // Documentation for library: https://github.com/exupero/saveSvgAsPng
    const TITLE_HEIGHT = 50
    const LEGEND_WIDTH = 250
    const LEGEND_HEIGHT = 400
    const FO_NAMESPACE = 'http://www.w3.org/2000/svg'
    const FONT_FAMILY = 'Myriad Pro'

    // First, get the actually-existing SVG and clone it
    let svg = document.querySelector(`.${this.props.className} svg`)
    svg = svg.cloneNode(true)

    // We will copy the already-existing Legend div from the page, if it exists.
    let legend = document.querySelector(`.${this.props.className} .Legend`)

    // We need to increase the height of the svg by TITLE_HEIGHT and the width by
    // LEGEND_WIDTH, if a legend exists.
    const originalSVGWidth = +svg.getAttribute('width')
    const originalSVGHeight = +svg.getAttribute('height')
    if (legend) {
      svg.setAttribute('width', originalSVGWidth + LEGEND_WIDTH)
    }
    svg.setAttribute('height', originalSVGHeight + TITLE_HEIGHT)
    svg.setAttribute('style', 'background-color: #fff')

    // The graph itself is in a <g> tag as a first child of the <svg>. We need
    // to translate it downwards to accommodate the title at the top. Note that
    // g.getAttribute('transform') returns something like 'translate(70, 20)',
    // where the first number is the x-distance and the second is the y-distance
    // the graph has been translated (effectively, the left and right margins of
    // the graph, respectively).
    const g = svg.firstChild
    console.log('g', g)
    console.log('g.getAttribute(transform)',)

    // On IE Edge, the two items are actually not separated by a ',', so we need
    // to split on the space instead.
    const transform = g.getAttribute('transform')
    console.log(transform)

    const translateComponents = transform.indexOf(',') > 0
      ? transform.split(',')
      : transform.split(' ')
    
    console.log('translateComponents', translateComponents)

    // Now translateComponents is something like ['translate(70', '20)']. We
    // can get the top margin by running parseInt on the second array item.
    const graphTopMargin = parseInt(translateComponents[1], 10)

    // Re-set the second array item by increasing the top margin by the height
    // of the title.
    translateComponents[1] = (graphTopMargin + TITLE_HEIGHT) + ')'

    // Re-set the transform attribute by re-joining the translateComponents
    // array. Now we have something like 'translate(70, 70)'.
    g.setAttribute('transform', translateComponents.join(','))

    // Build a virtual foreignObject element and set its parameters.
    const titleFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
    titleFO.setAttribute('height', TITLE_HEIGHT)
    titleFO.setAttribute('width', originalSVGWidth)
    titleFO.setAttribute('style', `font-family: "${FONT_FAMILY}"`)

    // Build the title element, append to the FO, and append the FO to the SVG
    const title = document.createElement('h1')
    title.innerHTML = this.props.title
    titleFO.appendChild(title)
    svg.appendChild(titleFO)

    if (legend) {
      // If legend exists, we need to insert it into a foreign object and append
      // it to the SVG.
      var legendFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
      legendFO.setAttribute('height', LEGEND_HEIGHT)
      legendFO.setAttribute('width', LEGEND_WIDTH)
      legendFO.setAttribute('y', graphTopMargin + TITLE_HEIGHT)
      legendFO.setAttribute('x', originalSVGWidth)

      legend = legend.cloneNode(true)
      legend.setAttribute('style', `font-family: "${FONT_FAMILY}"`)
      legendFO.appendChild(legend)
      // svg.appendChild(legendFO)
    }

    // Add the active filters for context, if available.
    let filters = document.querySelector(`.${this.props.className} .FilterNotes`)
    if (legend && filters) {
      // Append the filters to the legend.
      filters = filters.cloneNode(true)
      filters.setAttribute('style', `font-family: "${FONT_FAMILY}"`)
      legendFO.appendChild(filters)
      svg.appendChild(legendFO)
    }

    // Now we can save our cloned SVG as a PNG.
    saveSVG.saveSvgAsPng(svg, `${this.props.className}.png`, { scale: 2 })
  }

  render () {
    if (!this.props.className) {
      console.warn('GraphFrame should be provided a className attribute')
    }

    const isIE = /*@cc_on!@*/false || !!document.documentMode;

    return (
      <div className={`GraphFrame row${this.props.className ? ` ${this.props.className}` : ''}`}>
        <div className='col-9'>
          {this.props.graph}
        </div>
        <div className='col-3'>
          {this.props.legend}
          {!this.props.hideFilterNotes &&
            <FilterNotes />
          }
          {!isIE && 
            <button className='btn btn-sm btn-primary SavePNG' onClick={this.saveSVGAsPNG}>
              <i className='fas fa-download' />Save as PNG
            </button>
          }
        </div>
      </div>
    )
  }
}

export default GraphFrame
