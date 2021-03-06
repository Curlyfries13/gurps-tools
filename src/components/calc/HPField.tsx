import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { updateHP, updateCurrentHP } from 'src/redux/actions/characterActions';
import { RootState } from 'src/redux';

import { numberPattern } from 'src/utils/jsUtils';

const HPField = ({ hp, currHP, updateHP, updateCurrentHP }: Props) => {
  const [maxHP, setMaxHP]: [string, Function] = useState(String(hp));
  const [currentHP, setCurrentHP]: [string, Function] = useState(
    String(currHP)
  );

  useEffect(() => {
    setMaxHP(hp);
    setCurrentHP(currHP);
  }, [hp, currHP]);

  function handleUpdateHP(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    if (value && value.match(numberPattern) !== null) {
      const parseVal: number = parseInt(value, 10) || 0;
      updateHP(parseVal);
      updateCurrentHP(parseVal);
    }
    setMaxHP(value);
  }

  function handleUpdateCurrentHP(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    if (value && value.match(numberPattern) !== null) {
      const parseVal: number = parseInt(value, 10) || 0;
      updateCurrentHP(parseVal);
    }
    setCurrentHP(value);
  }

  // there should only be one of these components: all id's are designated as
  // if this is the case
  return (
    <>
      <label
        htmlFor='max-hp'
        className='col col-form-label d-flex justify-content-center'
      >
        HP
      </label>
      <div className='d-flex'>
        <div>
          <input
            type='text'
            aria-label='current hit points'
            className='form-control'
            id='current-hp'
            value={currentHP}
            onChange={handleUpdateCurrentHP}
          />
        </div>
        <p className='fs-4 mx-2 text-muted'>/</p>
        <div>
          <input
            type='text'
            aria-label='total hit points'
            className='form-control'
            id='max-hp'
            value={maxHP}
            onChange={handleUpdateHP}
          />
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    hp: state.hp,
    currHP: state.currHp,
  };
}

const mapDispatchToProps = {
  updateHP,
  updateCurrentHP,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(HPField);
