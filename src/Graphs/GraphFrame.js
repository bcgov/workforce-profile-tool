import React, { Component } from 'react'
import * as saveSVG from 'save-svg-as-png'

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

    // We need to increase the height of the svg by TITLE_HEIGHT and the width by
    // LEGEND_WIDTH
    const originalSVGWidth = +svg.getAttribute('width')
    const originalSVGHeight = +svg.getAttribute('height')
    svg.setAttribute('width', originalSVGWidth + LEGEND_WIDTH)
    svg.setAttribute('height', originalSVGHeight + TITLE_HEIGHT)
    svg.setAttribute('style', 'background-color: #fff')

    // The graph itself is in a <g> tag as a first child of the <svg>. We need
    // to translate it downwards to accommodate the title at the top. Note that
    // g.getAttribute('transform') returns something like 'translate(70, 20)',
    // where the first number is the x-distance and the second is the y-distance
    // the graph has been translated (effectively, the left and right margins of
    // the graph, respectively).
    const g = svg.firstChild
    const translateComponents = g.getAttribute('transform').split(',')

    // Now translateComponents is something like ['translate(70', '20)']. We
    // can get the top margin by running parseInt on the second array item.
    const graphTopMargin = parseInt(translateComponents[1])

    // Re-set the second array item by increasing the top margin by the height
    // of the title.
    translateComponents[1] = (graphTopMargin + TITLE_HEIGHT) + ')'

    // Re-set the transform attribute by re-joining the translateComponents
    // array. Now we have something like 'translate(70, 70)'.
    g.setAttribute('transform', translateComponents.join(','))

    // Build a virtual foreignObject element and set its parameters.
    var titleFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
    titleFO.setAttribute('height', TITLE_HEIGHT)
    titleFO.setAttribute('width', originalSVGWidth + LEGEND_WIDTH)
    titleFO.setAttribute('style', `font-family: "${FONT_FAMILY}"`)

    // Build the title element, append to the FO, and append the FO to the SVG
    var title = document.createElement('h1')
    title.innerHTML = this.props.title
    titleFO.appendChild(title)
    svg.appendChild(titleFO)

    // We will copy the already-existing Legend div from the page. Again, we
    // need to insert it into a foreign object and append it to the SVG.
    var legendFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
    legendFO.setAttribute('height', LEGEND_HEIGHT)
    legendFO.setAttribute('width', LEGEND_WIDTH)
    legendFO.setAttribute('y', graphTopMargin + TITLE_HEIGHT)
    legendFO.setAttribute('x', originalSVGWidth)

    var legend = document.querySelector(`.${this.props.className} .Legend`)
    legend = legend.cloneNode(true)
    legend.setAttribute('style', 'font-family: "Myriad Pro"')
    legendFO.appendChild(legend)
    svg.appendChild(legendFO)

    // Now we can save our cloned SVG as a PNG.
    saveSVG.saveSvgAsPng(svg, `${this.props.className}.png`, { scale: 2 })
  }

  render () {
    if (!this.props.className) {
      console.warn('GraphFrame should be provided a className attribute')
    }

    return (
      <div className={`GraphFrame row${this.props.className ? ` ${this.props.className}` : ''}`}>
        <div className='col-9'>
          <button className='btn btn-sm btn-primary' onClick={this.saveSVGAsPNG}>Save SVG</button>
          {this.props.graph}
        </div>
        <div className='col-3'>
          {/* <FilterCount filterCount={this.props.filterCount} /> */}
          {this.props.legend}
        </div>
      </div>
    )
  }
}

export default GraphFrame
