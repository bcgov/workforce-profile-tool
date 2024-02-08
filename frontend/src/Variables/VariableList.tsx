import { VARIABLE_MAP } from '../Data/DataManager'
import VariableDisplay from './VariableDisplay'

import './VariableList.scss'

interface Props {
  showList: boolean
}

const VariableList = ({ showList }: Props): JSX.Element => {
  const variables = Object.values(VARIABLE_MAP).map((group) => (
    <VariableDisplay key={group.key} variableGroup={group} />
  ))

  return (
    <div className={`VariableList row collapse ${showList ? 'show' : ''}`}>
      {variables}
    </div>
  )
}

export default VariableList
