import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Collapse } from 'reactstrap';

import { Armor, MoveDirection } from '/src/types';
import { moveArmor } from '/src/redux/actions/armorActions';
import { RootState } from '/src/redux';

import DRField from './DRField';

const ArmorForm = ({ armor, removeArmor, moveArmor }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const handleMove = (direction: MoveDirection) => {
    moveArmor(armor, direction);
  };

  return (
    <div className='container mb-2 card card-body'>
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
      <Collapse className='row mb-2' isOpen={isOpen}>
        <DRField armorId={armor.id} />
      </Collapse>
      <div className='row d-flex mb-1 g-4 justify-content-center'>
        <div className='d-grid col col-2'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => handleMove(MoveDirection.DOWN)}
          >
            <i className='bi bi-caret-down-fill' />
          </button>
        </div>
        <div className='d-grid col col-2'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => handleMove(MoveDirection.UP)}
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
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    ...state,
    armor: ownProps.armor,
    removeArmor: ownProps.removeArmor,
  };
}

const mapDispatchToProps = {
  moveArmor,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ArmorForm);
