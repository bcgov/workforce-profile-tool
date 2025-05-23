/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as saveSVG from 'save-svg-as-png'
import React, { useEffect } from 'react'
import useDimensions from 'react-use-dimensions'

import { useDataManager } from '../Data/DataManager'
import FilterNotes from './FilterNotes'
import IntentionalAny from '../@types/IntentionalAny'
import NoGraph from '../Views/NoGraph'

import './Graphs.scss'

interface Props {
  /** The class name for the graph. */
  className: string
  /** The graph itself. This would typically be a Nivo bar chart, but could be
   * anything else.
   */
  graph: React.ReactNode
  /** The height of the graph (optional). */
  height?: number
  /** Whether this frame is for an Organization graph. If so, the active filters
   * will be shown differently.
   */
  isOrganizationFrame?: boolean
  /** The numeric values of every datum to graph. If they're all zero, Nivo
   * breaks and we have to display a message to the user.
   */
  items: number[]
  /** The legend for the graph. Most likely a Legend component. */
  legend: React.ReactNode
  /** The callback to call when the width changes. */
  setWidthCallback?: (width: number) => void
  /** The title for the graph. */
  title: string
}

/** A frame for a graph to ensure consistent apperance across the app. Takes in
 * the graph and legend as React nodes. Will also show an indicator of the
 * active filters, as well as a button to save the graph to PNG. Will also
 * call the supplied callback function when the width of the graph frame changes
 * (useful for updating the graph items).
 */
const GraphFrame = (props: Props): JSX.Element => {
  const [ref, { width }] = useDimensions()
  const { queryValues } = useDataManager()

  useEffect(() => {
    if (props.setWidthCallback) {
      props.setWidthCallback(width)
    }
  }, [width])

  const saveSVGAsPNG = (): void => {
    // Documentation for library: https://github.com/exupero/saveSvgAsPng
    const TITLE_HEIGHT = 50
    const LEGEND_WIDTH = 250
    const LEGEND_HEIGHT = 500
    const FO_NAMESPACE = 'http://www.w3.org/2000/svg'
    const FONT_FAMILY = 'BC Sans'
    const FONT_BASE_PATH = './fonts/'
    const FONT_INFO = [
      {
        filename: 'BCSans-Bold',
        fontWeight: 'bold',
      },
      {
        filename: 'BCSans-Regular',
        fontWeight: 'regular',
      },
    ]

    // First, get the actually-existing SVG and clone it
    let svg: Element = document.querySelector(
      `.${props.className} svg`
    ) as Element
    svg = svg.cloneNode(true) as Element

    // We will copy the already-existing Legend div from the page, if it exists.
    let legend = document.querySelector(`.${props.className} .Legend`)

    // We need to increase the height of the svg by TITLE_HEIGHT and the width by
    // LEGEND_WIDTH, if a legend exists.
    const originalSVGWidth = +svg.getAttribute('width')!
    const originalSVGHeight = +svg.getAttribute('height')!
    let width = originalSVGWidth
    const height = originalSVGHeight + TITLE_HEIGHT
    if (legend) {
      width += LEGEND_WIDTH
    }
    svg.setAttribute('width', `${width}`)
    svg.setAttribute('height', `${height}`)
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.setAttribute('style', 'background-color: #fff')

    // The graph itself is in a <g> tag as a first child of the <svg>. We need
    // to translate it downwards to accommodate the title at the top. Note that
    // g.getAttribute('transform') returns something like 'translate(70, 20)',
    // where the first number is the x-distance and the second is the y-distance
    // the graph has been translated (effectively, the left and right margins of
    // the graph, respectively).
    const g = Array.from(svg.children).find((c) => {
      return c.tagName === 'g'
    })

    // On IE Edge, the two items are actually not separated by a ',', so we need
    // to split on the space instead.
    const transform = g!.getAttribute('transform')

    const translateComponents =
      transform!.indexOf(',') > 0
        ? transform!.split(',')
        : transform!.split(' ')

    // Now translateComponents is something like ['translate(70', '20)']. We
    // can get the top margin by running parseInt on the second array item.
    const graphTopMargin = parseInt(translateComponents[1], 10)

    // Re-set the second array item by increasing the top margin by the height
    // of the title.
    translateComponents[1] = graphTopMargin + TITLE_HEIGHT + ')'

    // Re-set the transform attribute by re-joining the translateComponents
    // array. Now we have something like 'translate(70, 70)'.
    g!.setAttribute('transform', translateComponents.join(','))

    // Build a virtual foreignObject element and set its parameters.
    const titleFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
    titleFO.setAttribute('height', `${TITLE_HEIGHT}`)
    titleFO.setAttribute('width', `${originalSVGWidth}`)
    titleFO.setAttribute('style', `font-family: "${FONT_FAMILY}"`)

    // Build the title element, append to the FO, and append the FO to the SVG
    const title = document.createElement('h1')
    title.innerHTML = props.title
    titleFO.appendChild(title)
    svg.appendChild(titleFO)

    let legendFO

    if (legend) {
      // If legend exists, we need to insert it into a foreign object and append
      // it to the SVG.
      legendFO = document.createElementNS(FO_NAMESPACE, 'foreignObject')
      legendFO.setAttribute('height', `${LEGEND_HEIGHT}`)
      legendFO.setAttribute('width', `${LEGEND_WIDTH}`)
      legendFO.setAttribute('y', `${TITLE_HEIGHT}`)
      legendFO.setAttribute('x', `${originalSVGWidth}`)

      legend = legend.cloneNode(true) as Element
      const tooltips = legend.getElementsByClassName('Tooltip')
      Array.from(tooltips).forEach((tooltip) => {
        tooltip.parentNode?.removeChild(tooltip)
      })
      legend.setAttribute('style', `font-family: "${FONT_FAMILY}"`)
      legendFO.appendChild(legend)
    }

    // Add the active filters for context, if available.
    let filters: Element = document.querySelector(
      `.${props.className} .FilterNotes`
    ) as Element
    if (legend && filters) {
      // Append the filters to the legend.
      filters = filters.cloneNode(true) as Element
      filters.setAttribute('style', `font-family: "${FONT_FAMILY}"`)
      filters.setAttribute('y', '100')
      if (legendFO) {
        legendFO.appendChild(filters)
        svg.appendChild(legendFO)
      }
    }

    // Now we can save our cloned SVG as a PNG.
    // filename includes filters
    // YYYY_Organization_EmployeeType_DesignatedGroup
    const filename = `${queryValues.Year}_${queryValues.Ministry_Key}_${queryValues.Employee_Type}_${queryValues.Des_Grp.join('_').replace('2SLGBTQPlus', '2SLGBTQ+')}_${props.className.replace('2SLGBTQPlus', '2SLGBTQ+')}.png`
    saveSVG.saveSvgAsPng(svg, filename, {
      scale: 2,
      fonts: FONT_INFO.map((fontInfo) => {
        const fontUrl = `${FONT_BASE_PATH}${fontInfo.filename}.woff`
        return {
          url: fontUrl,
          text: `
          @font-face {
            font-family: ${FONT_FAMILY};
            font-style: normal;
            font-weight: ${fontInfo.fontWeight};
            font-display: swap;
            src: url(${fontUrl}) format('woff');
          }`,
        }
      }),
    })
  }

  if (!props.className) {
    console.warn('GraphFrame should be provided a className attribute')
  }

  if (props.items.every((item: number) => item === 0)) {
    // All items are zero. We can't chart this (Nivo breaks when every value it
    // is asked to chart is zero, at least for now...)
    // TODO: Maybe Nivo will handle this better someday.
    return <NoGraph />
  }

  const isIE =
    /*  @cc_on!@ */ false || !!(document as IntentionalAny).documentMode

  return (
    <div
      className={`GraphFrame row${props.className ? ` ${props.className}` : ''
        }`}
    >
      <div
        className="col-md-9 col-12"
        style={{ height: `${props.height || 500}px` }}
        ref={ref}
      >
        {props.graph}
      </div>
      <div className="col-md-3 col-12 mb-4 mb-md-0">
        <div className="row">
          <div className="col-6 col-md-12 mt-3 mt-md-0">{props.legend}</div>
          <div className="col-6 col-md-12">
            <FilterNotes isOrganizationNotes={props.isOrganizationFrame} />
          </div>
          <div className="col-6 col-md-12">
            {!isIE && (
              <button
                className="btn btn-sm btn-primary SavePNG Shadow mt-3"
                onClick={saveSVGAsPNG}
              >
                <i className="fas fa-download" />
                Save as PNG
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphFrame
