import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { updateArmor } from '/src/redux/actions/armorActions';
import { RootState } from '/src/redux/reducers';

import { Armor } from '/src/types';
import { ensureFound } from '/src/utils/jsUtils';

const AblateField = ({ armorId, armor, updateArmor }: Props) => {
  // TODO: wire up vlaidation and errors
  const [errors, setErrors]: [any, Function] = useState({});
  const [warn, setWarn]: [any, Function] = useState({});
  const id: string = armorId + '-ablateBase';

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    const base: number = parseInt(value, 10) || 0;
    const updatedArmor: Armor = { ...armor, ablateBase: base };
    updateArmor(updatedArmor);
  }

  // TODO: wire up vlaidation
  function ablateIsValid(armor: Armor) {
    const errors: any = {};
    const warn: any = {};
    if (!(armor.ablateBase >= 0))
      errors.ablateBase = 'Ablate Base must be a positive value';
    if (!(armor.ablateBase == 0))
      warn.zero = 'Ablate Base should be a positive value';
    setErrors(errors);
    setWarn(warn);
    return Object.keys(errors).length === 0;
  }

  // TODO: update accessibility label to update with
  return (
    <div className='row'>
      <label htmlFor={id} className='col col-form-label'>
        Ablate Base
      </label>
      <div className='col'>
        <input
          aria-label="this armor's ablative base"
          className='form-control'
          id={id}
          value={armor.ablateBase}
          onChange={handleValueChange}
        />
      </div>
    </div>
  );
};

interface OwnProps {
  armorId: number;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  const armor: Armor = ensureFound<Armor>(
    state.armorStack.find((armor: Armor) => {
      return armor.id === ownProps.armorId;
    })
  );
  return {
    armor: armor,
  };
}

const mapDispatchToProps = {
  updateArmor,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & OwnProps;

export default connector(AblateField);
