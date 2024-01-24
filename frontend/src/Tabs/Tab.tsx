interface Props {
  children: React.ReactNode
  name: string
}

const Tab = ({ children }: Props): JSX.Element => {
  return <div className="col-xs-12">{children}</div>
}

export default Tab
