import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Subject } from 'rxjs';

import { Armor, MoveDirection } from 'src/types';
import { moveArmor, updateArmor } from 'src/redux/actions/armorActions';
import { RootState } from 'src/redux';

import { default as Collapse } from 'src/components/common/Collapse';
import TextInput from '../common/TextInput';
import DRField from './DRField';
import AblateField from './AblateField';

const ArmorForm = ({
  armor,
  removeArmor,
  collapse,
  moveArmor,
  updateArmor,
  armorStack,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    collapse.asObservable().subscribe({
      next: () => {
        setIsOpen(false);
      },
    });
    return function cleanup() {
      collapse.unsubscribe();
    };
  }, [collapse]);

  const toggle = () => setIsOpen(!isOpen);

  const handleMove = (direction: MoveDirection) => {
    moveArmor(armor, direction);
  };

  const handleAblateToggle = () => {
    updateArmor({ ...armor, ablative: !armor.ablative });
  };

  function handleAblateBaseUpdate(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    const base: number = parseInt(value, 10) || 0;
    const updatedArmor: Armor = { ...armor, ablateBase: base };
    updateArmor(updatedArmor);
  }

  function handleNameUpdate(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const updatedArmor: Armor = { ...armor };
    updatedArmor.name = value;
    updateArmor(updatedArmor);
  }

  const switchId = armor.id + '-ablative';

  return (
    <div
      className='container mb-2 card card-body'
      role='listitem'
      aria-label={armor.name + ' section'}
    >
      <div className='row g-2 mb-2'>
        <div className='col'>
          <button className='btn btn-primary' type='button' onClick={toggle}>
            {isOpen ? 'Collapse ' + armor.name : 'Open ' + armor.name}
          </button>
        </div>
        <div className='d-grid col-3 col-md2'>
          <button
            className='btn btn-outline-danger'
            type='button'
            onClick={() => removeArmor(armor)}
          >
            <i className='bi bi-shield-slash'></i>
          </button>
        </div>
      </div>
      <Collapse
        className='row md-flex justify-content-between b-2 mb-3'
        role='group'
        aria-label={'armor ' + armor.order + ' collapse group'}
        isOpen={isOpen}
      >
        <div className='col col-6'>
          <TextInput
            id={armor.id + '-name'}
            label='Name'
            value={armor.name}
            onChange={handleNameUpdate}
          />
          <DRField armorId={armor.id} />
        </div>
        <div className='col col-6'>
          <div className='row mb-1'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                onChange={() => handleAblateToggle()}
                checked={armor.ablative}
                type='checkbox'
                id={switchId}
              />
              <label className='form-check-label' htmlFor={switchId}>
                Ablative
              </label>
            </div>
          </div>
          <Collapse className='row mb-1' isOpen={armor.ablative}>
            <AblateField armorId={armor.id} />
          </Collapse>
        </div>
      </Collapse>
      <div className='row d-flex mb-1 g-4 justify-content-center'>
        <div className='d-grid col col-2'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => handleMove(MoveDirection.DOWN)}
            disabled={armorStack.length === 1}
          >
            <i className='bi bi-caret-down-fill' />
          </button>
        </div>
        <div className='d-grid col col-2'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => handleMove(MoveDirection.UP)}
            disabled={armorStack.length === 1}
          >
            <i className='bi bi-caret-up-fill' />
          </button>
        </div>
      </div>
    </div>
  );
};

interface OwnProps {
  armor: Armor;
  removeArmor: Function;
  collapse: Subject<void>;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    armorStack: state.armorStack,
    armor: ownProps.armor,
    removeArmor: ownProps.removeArmor,
  };
}

const mapDispatchToProps = {
  moveArmor,
  updateArmor,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & OwnProps;

export default connector(ArmorForm);
