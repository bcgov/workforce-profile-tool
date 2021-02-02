import React from 'react'

interface Props {
  children: React.ReactNode
  name: string
}

class Tab extends React.Component<Props> {
  render(): JSX.Element {
    return <div className="col-xs-12">{this.props.children}</div>
  }
}

export default Tab
