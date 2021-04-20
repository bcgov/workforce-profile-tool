import React from 'react'

import Subtitle from './Subtitle'

interface Props {
  title: string
}

const Title = ({ title }: Props): JSX.Element => {
  return (
    <div>
      <h1>{title}</h1>
      <Subtitle />
    </div>
  )
}

export default Title
