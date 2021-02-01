export interface Armor {
  id: number;
  order: number;
  name: string;
  dr: number;
  ablative: boolean;
  ablateBase: number;
  vulnerabilities: Array<Vulnerability>;
}

export interface Vulnerability {
  name: string;
  multiplier: number;
}

export enum MoveDirection {
  UP,
  DOWN,
}
