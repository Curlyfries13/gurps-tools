import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/redux';

import { numberPattern } from 'src/utils/jsUtils';
import TextInput from '../common/TextInput';

const SummaryDR = ({ propDR, setPropDR, armorStack }) => {
  const [isActive, setActive] = useState(armorStack.length === 0);
  const [errors, setErrors]: [string[], Function] = useState([]);
  const [summaryDR, setSummaryDR]: [string, Function] = useState(propDR);

  useEffect(() => {
    setActive(armorStack.length === 0);
  }, [armorStack]);

  useEffect(() => {
    setSummaryDR(propDR);
  }, [propDR]);

  function handleUpdateSummaryDR(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.target;
    const valid = validateDR(value);
    setSummaryDR(value);
    if (isActive && valid) {
      const parseValue = parseInt(value, 10) || 0;
      setPropDR(parseValue);
    }
  }

  function validateDR(dr: string): boolean {
    const errorStack: string[] = [];
    const parseValue = parseInt(dr, 10);
    if (dr.match(numberPattern) === null || parseValue < 0) {
      errorStack.push('DR must be a non-negative value');
    }
    setErrors(errorStack);
    return Object.keys(errors).length === 0;
  }

  const renderValidationErrors = (vals: string[] | undefined) => {
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

  return (
    <>
      <label
        htmlFor='DR-sum'
        className='col col-form-label d-flex justify-content-center'
      >
        DR
      </label>
      <input
        type='text'
        aria-label='Summary Damage Resistence'
        className='form-control'
        id='DR-sum'
        readOnly={!isActive}
        value={summaryDR}
        onChange={handleUpdateSummaryDR}
      />
      {renderValidationErrors(errors)}
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    armorStack: state.armorStack,
  };
}

export default connect(mapStateToProps)(SummaryDR);
