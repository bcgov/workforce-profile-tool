import Dictionary from '../@types/Dictionary'
import { Variable } from './Variable'

export class VariableGroup {
  private _key: string
  private _exclusive: boolean
  private _display: string
  private _variables: Variable[]
  private _selectableVariables: Variable[]
  private _variableMap: Dictionary<Variable> = {}

  constructor(
    key: string,
    exclusive: boolean,
    display: string,
    variables: Variable[]
  ) {
    this._key = key
    this._exclusive = exclusive
    this._display = display
    this._variables = variables
    this._selectableVariables = variables.filter((v) => v.selectable)
    this._buildVariableMap()
  }

  get key(): string {
    return this._key
  }
  get exclusive(): boolean {
    return this._exclusive
  }
  get display(): string {
    return this._display
  }
  get variables(): Variable[] {
    return this._variables
  }
  get selectableVariables(): Variable[] {
    return this._selectableVariables
  }
  get variableMap(): Dictionary<Variable> {
    return this._variableMap
  }

  _buildVariableMap(): void {
    this._variableMap = {}
    this._variables.forEach((variable) => {
      this._variableMap[variable.key] = variable
    })
  }
}
