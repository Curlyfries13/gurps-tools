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

export interface DamageType {
  name: string;
  mult: number;
}

export const DamageTypes = {
  cr: { name: 'crushing', mult: 1 },
  cut: { name: 'cutting', mult: 1.5 },
  imp: { name: 'impaling', mult: 2 },
  pi: { name: 'piercing', mult: 1 },
  'pi+': { name: 'large piercing', mult: 1.5 },
  'pi++': { name: 'huge piercing', mult: 2.0 },
  'pi-': { name: 'small piercing', mult: 0.5 },
  burn: { name: 'burning', mult: 1 },
  cor: { name: 'corrosive', mult: 1 },
  fat: { name: 'fatigue', mult: 1 },
  tox: { name: 'toxic', mult: 1 },
};

export type DamageTypeCollection = typeof DamageTypes;
