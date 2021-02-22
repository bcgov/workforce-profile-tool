import React from 'react'

import * as R from 'recharts'
import LabelList from './LabelList'

interface Props {
  dataKey: string
  fill: string
  formatter?: (d: string) => string
  position?: string
}

const LabelledBar = (props: Props): JSX.Element => {
  return (
    <R.Bar {...props} dataKey={props.dataKey} fill={props.fill}>
      <LabelList
        {...props}
        dataKey={props.dataKey}
        formatter={props.formatter}
      />
    </R.Bar>
  )
}

export default LabelledBar