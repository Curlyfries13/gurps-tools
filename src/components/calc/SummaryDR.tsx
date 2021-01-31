import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TextInput from '../common/TextInput';

const SummaryDR = ({ propDR, setPropDR, armorStack }) => {
  const [isActive, setActive] = useState(armorStack.length === 0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setActive(armorStack.length === 0);
  }, [armorStack]);

  function handleUpdateSummaryDR(event) {
    event.preventDefault();
    if (isActive) {
      armorIsValid(propDR);
      const value = event.target.value
        ? parseInt(event.target.value, 10)
        : event.target.value;
      setPropDR(value);
    }
  }

  function armorIsValid(dr) {
    const errors = {};
    if (dr >= 0) errors.dr = 'DR must be a non-negative value';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <TextInput
      name='DR'
      id='DR-sum'
      label='DR'
      labelClass='d-flex justify-content-center'
      accLabel='Summary Damage Resistence'
      active={isActive}
      value={propDR}
      onChange={handleUpdateSummaryDR}
    />
  );
};

function mapStateToProps(state) {
  return {
    armorStack: state.armorStack,
  };
}

export default connect(mapStateToProps)(SummaryDR);
