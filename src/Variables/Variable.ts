export class Variable {
  private _key: string
  private _selectable: boolean
  private _shortDisplay: string
  private _display: string

  constructor(
    key: string,
    selectable: boolean,
    shortDisplay: string | null,
    display: string
  ) {
    this._key = key
    this._selectable = selectable
    this._shortDisplay = shortDisplay || display
    this._display = display
  }

  get key(): string {
    return this._key
  }
  get selectable(): boolean {
    return this._selectable
  }
  get shortDisplay(): string {
    return this._shortDisplay
  }
  get display(): string {
    return this._display
  }
}
