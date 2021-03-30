import React from 'react'

import * as R from 'recharts'
import LabelList from './LabelList'

interface Props {
  dataKey: string
  fill: string
  formatter?: (d: string) => string
  position?: R.LabelProps['position']
}

const LabelledBar = (props: Props): JSX.Element => {
  return (
    <R.Bar
      {...props}
      dataKey={props.dataKey}
      fill={props.fill}
      isAnimationActive={false}
    >
      <LabelList
        {...props}
        key={Math.random()}
        dataKey={props.dataKey}
        formatter={props.formatter}
      />
    </R.Bar>
  )
}

export default LabelledBar
