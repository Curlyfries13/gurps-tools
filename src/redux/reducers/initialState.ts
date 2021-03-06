// TODO: refactor "currHp" to be more consistent
// TODO: consider breaking out log state into it's own slice

export default {
  armorStack: [],
  hp: 10,
  currHp: 10,
  diceMode: false,
  damageExpression: '0',
  damageType: 'cr',
  damageMultiplier: 1,
  expressionIsValid: true,
  log: [],
  currentLogEntry: '',
};
