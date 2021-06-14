import React from 'react'

import { BarDatum, LabelFormatter } from '@nivo/bar'
import { Margin } from '@nivo/core'
import { parseFloatClean } from '../Helpers/formatter'
import Dictionary from '../@types/Dictionary'

/** A helper to add exterior labels (just past the end of the bar) on a Nivo bar
 * chart with horizontal bars. They must be calculated using this function
 * because Nivo cannot at this time add such labels out-of-the-box.
 * @param margins The graph margins.
 * @param width The graph width.
 * @param maxItem The maximum value for the data.
 * @param formatter The formatter to use for the data values.
 */
export const horizontalLabel = (
  margins: Margin,
  width: number,
  maxItem: number,
  formatter: (d: string) => string
): LabelFormatter => {
  const labelBuilder = (d: string | number) => {
    const numD = parseFloatClean(d) || 0
    const numWidth = isNaN(width) ? 1 : width
    // If the maximum item is 0, we must actually set it to a fractional amount,
    // or else the label will be suppressed by Nivo.
    const numMaxItem = maxItem === 0 ? 0.001 : maxItem

    const dx =
      3 +
      (numD * (numWidth - margins.right - margins.left - 25)) / 2 / numMaxItem

    // Kind of hacky to return a <tspan> as a string, but something in the
    // TypeScript definitions complains otherwise.
    return ((
      <tspan dy={0} dx={dx} style={{ textAnchor: 'start' }}>
        {formatter(`${d}`)}
      </tspan>
    ) as unknown) as string
  }
  return labelBuilder
}

/** A helper to add exterior labels (just past the end of the bar) on a Nivo bar
 * chart with vertical bars. A somewhat simpler calculation than for labels on
 * horizontal bar charts.
 * @param margins The graph margins.
 * @param width The graph width.
 * @param maxItem The maximum value for the data.
 * @param formatter The formatter to use for the data values.
 */
export const verticalLabel = (
  margins: Margin,
  height: number,
  maxItem: number,
  formatter: (d: string) => string
): LabelFormatter => {
  const labelBuilder = (d: string | number) => {
    const numD = parseFloatClean(d) || 0
    const numWidth = isNaN(height) ? 1 : height
    const numMaxItem = maxItem === 0 ? 0.001 : maxItem

    const dy =
      10 + (numD * (numWidth - margins.bottom - margins.top)) / 2 / numMaxItem

    return ((
      <tspan dx={0} dy={-dy} style={{ textAnchor: 'middle' }}>
        {formatter(`${d}`)}
      </tspan>
    ) as unknown) as string
  }
  return labelBuilder
}

/** A helper to obtain the string representation of a value; it is expected to
 * be stored in a column with the suffix `_str`. This is mainly because of
 * suppressed values, which Nivo otherwise sets to zero because they are non-
 * numeric. So, we graph the numeric values, and keep the original values in
 * a separate column, using those values for the labels.
 *
 * @param d A Nivo BarDatum
 */
export const labelValue = (d: BarDatum): string => {
  const label = ((d.data as unknown) as Dictionary<string>)[`${d.id}_str`]
  return label
}
