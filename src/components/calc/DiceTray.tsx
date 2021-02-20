import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from 'src/redux';
import {
  setExpression,
  setValidExpression,
  setDiceMode,
} from 'src/redux/actions/damageActions';
import { basicPattern as dicePattern } from 'src/utils/diceUtils';
import { numberPattern } from 'src/utils/jsUtils';

// Consider if we want to move this out into Redux

const DiceTray = ({
  expression,
  expressionIsValid,
  setValidExpression,
  setExpression,
  setDiceMode,
}: Props) => {
  const id = 'dice-tray';
  const [valid, setValid]: [boolean, Function] = useState(false);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // first try to parse as an integer
    const { value } = event.target;
    let outVal: number = parseInt(value, 10);
    setExpression(value);
    if (value.match(numberPattern) !== null && outVal >= 0) {
      setDiceMode(false);
      setValidExpression(true);
    } else if (value.match(dicePattern) !== null) {
      setDiceMode(true);
      setValidExpression(true);
    } else {
      // TODO: check if the expression is too long
      setDiceMode(false);
      setValidExpression(false);
    }
  }

  return (
    <>
      <label
        className='col col-form-label d-flex justify-content-center'
        htmlFor={id + 'value'}
      >
        Damage Value
      </label>
      <input
        type='tet'
        aria-label='value for damage calculation'
        className='form-control'
        id={id + 'value'}
        value={expression}
        onChange={handleValueChange}
      />
      <div className='row m-2'></div>
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    expression: state.damageExpression,
    expressionIsValid: state.expressionIsValid,
  };
}

const mapDispatchToProps = {
  setValidExpression,
  setExpression,
  setDiceMode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(DiceTray);
