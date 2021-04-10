// recharts doesn't export the default tooltip,
// but it's located in the package lib so you can get to it anyways
import React from 'react'
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent'

import FixTypeLater from '../@types/FixTypeLater'

const CustomTooltip = (props: FixTypeLater): JSX.Element => {
  // we don't need to check payload[0] as there's a better prop for this purpose
  if (!props.active || !props.payload) {
    // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
    return <></>
  }
  // mutating props directly is against react's conventions
  // so we create a new payload with the name and value fields set to what we want
  const newPayload = [
    {
      name: 'Name',
      // all your data which created the tooltip is located in the .payload property
      value: props.payload[0].payload.name,
      // you can also add "unit" here if you need it
    },
    ...props.payload,
  ]

  // we render the default, but with our overridden payload
  // return <DefaultTooltipContent {...props} payload={newPayload} />

  return (
    <div
      className="CustomTooltip recharts-default-tooltip"
      style={{
        margin: '0px',
        padding: '10px',
        backgroundColor: 'rgb(255, 255, 255)',
        border: '1px solid rgb(204, 204, 204)',
        whiteSpace: 'nowrap',
      }}
    >
      <p className="recharts-tooltip-label" style={{ margin: '0px' }}>
        {props.labelFormatter(props.label)}
      </p>
      <ul
        className="recharts-tooltip-item-list"
        style={{ padding: '0px', margin: '0px' }}
      >
        {props.payload.map((payload: FixTypeLater, index: number) => {
          return (
            <li
              key={index}
              className="recharts-tooltip-item"
              style={{
                display: 'block',
                paddingTop: '4px',
                paddingBottom: '4px',
                color: payload.fill,
              }}
            >
              {props.labelFormatter(payload.name)}:{' '}
              {payload.formatter(payload.payload[payload.dataKey])}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CustomTooltip
