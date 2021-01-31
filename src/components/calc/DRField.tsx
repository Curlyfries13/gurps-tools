import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { updateArmor } from '/src/redux/actions/armorActions';
import { RootState } from '/src/redux';

import { Armor } from '/src/types';
import TextInput from '../common/TextInput';

const DRField = ({ armorId, armor, updateArmor }: Props) => {
  const [errors, setErrors]: [any, Function] = useState({});

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const dr: number = parseInt(value, 10) || 0;
    const updatedArmor: Armor = { ...armor, dr };
    updateArmor(updatedArmor);
  }

  function armorIsValid(armor: Armor) {
    const errors: any = {};
    if (!(armor.dr >= 0)) errors.dr = 'DR must be a non-negative value';
    if (armor.ablative && !(armor.ablateBase > 0)) {
      errors.ablative = 'Ablative base must be a positive value';
    }

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

interface OwnProps {
  armorId: number;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  const armor: Armor = state.armorStack.find((armor: Armor) => {
    return armor.id === ownProps.armorId;
  });
  return {
    armor: armor,
  };
}

const mapDispatchToProps = {
  updateArmor,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & OwnProps;

export default connector(DRField);
