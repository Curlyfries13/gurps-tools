export interface Armor {
  id: number
  name: string
  dr: number
  ablative: boolean
  ablateBase: number
  vulnerabilities: Array<Vulnerability>
}

export interface Vulnerability {
  name: string
  multiplier: number
}
