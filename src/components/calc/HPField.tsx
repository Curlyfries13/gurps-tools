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
  const [hpError, setHPError]: [string[], Function] = useState([]);
  const [currHPError, setCurrHPError]: [string[], Function] = useState([]);

  useEffect(() => {
    setMaxHP(hp);
    setCurrentHP(currHP);
  }, [hp, currHP]);

  function handleUpdateHP(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    validateHP(value);
    if (value && value.match(numberPattern) !== null) {
      const parseVal: number = parseInt(value, 10) || 0;
      updateHP(parseVal);
      updateCurrentHP(parseVal);
      validateCurrentHP(value);
    }
    setMaxHP(value);
  }

  function handleUpdateCurrentHP(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    validateCurrentHP(value);
    if (value && value.match(numberPattern) !== null) {
      const parseVal: number = parseInt(value, 10) || 0;
      updateCurrentHP(parseVal);
    }
    setCurrentHP(value);
  }

  function validateHP(value: any): void {
    let errorStack: string[] = [];
    if (!value || value.match(numberPattern) === null) {
      errorStack.push('Total HP must be a positive number');
    } else {
      const parseVal: number = parseInt(value, 10) || 0;
      if (parseVal < 1) {
        errorStack.push('Total HP must be a positive number');
      }
    }
    setHPError(errorStack);
  }

  function validateCurrentHP(value: any): void {
    let errorStack: string[] = [];
    if (!value || value.match(numberPattern) === null) {
      errorStack.push('Current HP must be a number');
    }
    setCurrHPError(errorStack);
  }

  const renderValidationErrors = () => {
    return (
      <>
        {renderErrors(hpError)}
        {renderErrors(currHPError)}
      </>
    );
  };

  const renderErrors = (vals: string[] | undefined) => {
    if (vals && vals.length > 0) {
      return (
        <div className='text-danger'>
          {vals.map((entry: string, index) => {
            return <small key={index}>{entry}</small>;
          })}
        </div>
      );
    }
  };

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
            aria-invalid={currHPError.length > 0}
            className={
              'form-control' + (currHPError.length > 0 ? ' is-invalid' : '')
            }
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
            aria-invalid={hpError.length > 0}
            className={
              'form-control' + (hpError.length > 0 ? ' is-invalid' : '')
            }
            id='max-hp'
            value={maxHP}
            onChange={handleUpdateHP}
          />
        </div>
      </div>
      {renderValidationErrors()}
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
