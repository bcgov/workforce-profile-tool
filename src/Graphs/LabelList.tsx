import React from 'react'

import * as R from 'recharts'

interface Props {
  dataKey: string
  formatter?: (d: string) => string
  position?: string
}

const LabelList = (props: Props): JSX.Element => {
  const position = props.position || 'right'
  return (
    <R.LabelList
      {...props}
      dataKey={props.dataKey}
      // @ts-ignore The typings are wrong
      formatter={props.formatter}
      position={position}
      fill={'#000'} // TODO: Does this need to be overriden?
      style={{
        fontSize: '14px',
      }}
    />
  )
}

export default LabelList
