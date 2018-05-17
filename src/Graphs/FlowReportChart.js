import * as PlusPlot from '@plot-and-scatter/plusplot'
import * as d3 from 'd3'

/**
 * @class
 * @extends AbstractPlot
 *
 * Expects props.data to be an array of objects. Each object has a `category`
 * property and a `values` array. The value of the `category` property is the
 * name of a higher-order category or grouping; the `values` array should be an
 * ordered list of values that will be grouped under the higher-order category.
 * Every list of values must have the same length.
 *
 * e.g. `[{category: 'A', values: [1, 2, 3]}, {category: 'B', values: [4, 5, 6]}`
 *
 * Can also take an optional `colors` array, which should be the same length as
 * the `values` arrays; these colors will be used instead of the default color
 * bands. If, however, `colors` is an array of only two elements, its two colors
 * will be used as an interpolation range to color the bars in each group.
 */
class FlowReportChart extends PlusPlot.AbstractPlot {
  constructor (props) {
    super(props)
    this.setBarSizes = this.setBarSizes.bind(this)
    this.setInitialBarSizes = this.setInitialBarSizes.bind(this)
    this.setDataLabels = this.setDataLabels.bind(this)
    this.setInitialDataLabels = this.setInitialDataLabels.bind(this)
  }

  getXScale () {
    const minRange = 0
    const maxRange = this.width
    const domain = this.props.data.map(d => d.category)
    return d3.scaleBand()
      .range([minRange, maxRange])
      .domain(domain)
      .padding(0.2)
  }

  stackMin (series) {
    return d3.min(series, d => d[0])
  }

  stackMax (series) {
    return d3.max(series, d => d[1])
  }

  getYScale () {
    const minRange = 0
    const maxRange = this.height
    const minDomain = d3.min(this.stackedData(), this.stackMin)
    const maxDomain = d3.max(this.stackedData(), this.stackMax)
    return d3.scaleLinear()
      .range([maxRange, minRange]) // Yes, we need to swap these
      .domain([minDomain, maxDomain])
      .nice()
  }

  getColorScale () {
    return d3.scaleOrdinal()
      .range(this.props.colors)
      .domain(this.props.stackKeys)
  }

  setBarSizes (bars) {
    bars
      .attr('x', (d) => this.getXScale()(d.data.category))
      .attr('y', d => this.getYScale()(d[1]))
      .attr('width', this.getXScale().bandwidth())
      .attr('height', d => this.getYScale()(d[0]) - this.getYScale()(d[1]))
  }

  setInitialBarSizes (bars) {
    bars
      .attr('x', (d) => this.getXScale()(d.data.category))
      .attr('y', d => this.height)
      .attr('width', this.getXScale().bandwidth())
      .attr('height', 0)
  }

  setDataLabels (dataLabelGroups) {
    const positionAdjustment = this.dataLabels.position || 0

    dataLabelGroups
      .attr('transform', d => `translate(${this.getXScale()(d.category)},0)`)

    dataLabelGroups.selectAll('text')
      .attr('x', (d, i) => this.getXScale()(i) + 0.5 * this.getXScale().bandwidth())
      .attr('y', d => this.getYScale()(d) + positionAdjustment)
      .style('font-family', this.font)
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .attr('fill', this.dataLabels.color)
      .text(d => this.dataLabels.formatter ? this.dataLabels.formatter(d) : d)
  }

  setInitialDataLabels (dataLabelGroups) {
    dataLabelGroups
      .attr('transform', d => `translate(${this.getXScale()(d.category)},0)`)

    dataLabelGroups.selectAll('text')
      .attr('x', (d, i) => this.getXScale()(i) + 0.5 * this.getXScale().bandwidth())
      .attr('y', d => this.height)
      .style('font-family', this.font)
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .attr('fill', this.dataLabels.color)
  }

  stackedData () {
    let stack = d3.stack().keys(this.props.stackKeys).offset(d3.stackOffsetExpand)
    if (this.props.absolute) {
      stack = stack.offset(d3.stackOffsetDiverging)
    }
    return stack(this.props.data)
  }

  updateVizComponents (duration = 500, delay = 0) {
    const yAxis = this.svg.select('.y-axis')
    const xAxis = this.svg.select('.x-axis')

    const axisLeft = d3.axisLeft(this.getYScale())

    if (this.props.absolute) {
      axisLeft.tickFormat(d => d3.format(',.0f')(Math.abs(d)))
    } else {
      axisLeft.tickFormat(d3.format('.0%'))
    }

    yAxis.transition()
      .duration(duration).delay(delay)
      .call(axisLeft)

    // d3.selectAll

    xAxis.transition()
      .duration(duration).delay(delay)
      .call(d3.axisBottom(this.getXScale()))

    const rotation = this.axes.xAxisRotateTickLabels
    const textAnchor =
            rotation < 0
            ? 'end'
            : rotation > 0
            ? 'start'
            : 'middle'

    this.wrapper.selectAll('.x-axis .tick text')
      .attr('transform', `rotate(${rotation})`)
      .style('text-anchor', textAnchor)
  }

  updateGraphicContents () {
    // The bars are the bars within each group
    const barGroups = this.wrapper
      .selectAll('.barGroup')
      .data(this.stackedData(), (d, i) => i)

    barGroups.enter().append('g')
      .attr('class', 'barGroup')
      .attr('fill', d => this.getColorScale()(d.key))

    barGroups.exit().remove()

    const bars = this.wrapper.selectAll('.barGroup')
      .selectAll('.bar')
      .data(d => d, d => d.data.category)

    const duration = 300

    const exit = bars.exit()
        .transition().duration(duration)
        .attr('height', 0)
        .attr('y', this.height)
        .remove()

    const delay = exit.size() ? duration : 0

    bars
      .transition().delay(delay).duration(duration)
      .call(this.setBarSizes)

    bars.enter().append('rect')
      .attr('class', 'bar')
      .call(this.setInitialBarSizes)
      .transition().delay(delay).duration(duration)
      .call(this.setBarSizes)

    if (this.dataLabels) {
      // The dataLabels are the dataLabels within each group
      // const dataLabels = this.wrapper.selectAll('.dataLabelGroup').selectAll('.dataLabel')
      //   .data(d => d.values, (d, i) => i)

      // dataLabels.enter().append('text')
      //   .attr('class', 'dataLabel')

      // dataLabels.exit().remove()
    }

    this.updateVizComponents(duration, delay)
  }

  render () {
    return super.render()
  }
}

export default FlowReportChart
