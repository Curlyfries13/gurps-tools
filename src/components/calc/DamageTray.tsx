import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from 'src/redux';
import { rollDamage, applyDamage } from 'src/redux/actions/damageActions';

import DiceTray from './DiceTray';

const DamageTray = ({
  diceMode,
  expression,
  expressionIsValid,
  damageType,
  rollDamage,
  applyDamage,
}: Props) => {
  const handleDamage = () => {
    if (expressionIsValid && diceMode) {
      rollDamage(expression, damageType);
    } else if (expressionIsValid) {
      applyDamage(parseInt(expression, 10) || 0, damageType);
    }
  };

  return (
    <>
      <div className='row m-2'>
        <div className='col col-6 offset-3 d-grid'>
          <button
            className={
              'btn btn-danger' + (expressionIsValid ? '' : ' disabled')
            }
            onClick={handleDamage}
          >
            <label>Damage!</label>
            <i className='bi bi-exclamation-triangle-fill'></i>
          </button>
        </div>
      </div>
      <div className='row m-2'>
        <DiceTray />
      </div>
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    diceMode: state.diceMode,
    expression: state.damageExpression,
    expressionIsValid: state.expressionIsValid,
    damageType: state.damageType,
  };
}

const mapDispatchToProps = {
  rollDamage,
  applyDamage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(DamageTray);
