import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateArmor } from '../../redux/actions/armorActions';

import TextInput from '../common/TextInput';

const DRField = ({ armorId, armor, updateArmor }) => {
  const [errors, setErrors] = useState({});

  function handleValueChange(event) {
    const { name, value } = event.target;
    updateArmor(armor);
  }

  function armorIsValid(armor) {
    const errors = {};
    if (!armor.dr >= 0) errors.dr = 'DR must be a non-negative value';
    if (armor.ablative && !armor.ablateBase > 0)
      errors.ablative = 'Ablative base must be a positive value';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // TODO: update accessibility label to update with
  return (
    <TextInput
      value={armor.dr}
      onChange={handleValueChange}
      label='DR'
      labelClass='d-flex justify-content-center'
      accLabel='Damage Resistence'
    />
  );
};

function mapStateToProps(state, ownProps) {
  const armor = state.armorStack.find((armor) => {
    return armor.id === ownProps.armorId;
  });
  return {
    armor: armor,
  };
}

const mapDispatchToProps = {
  updateArmor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DRField);
