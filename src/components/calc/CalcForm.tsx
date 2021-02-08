import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Subject } from 'rxjs';

import { addArmor, removeArmor } from '/src/redux/actions/armorActions';
import { resetHP } from '/src/redux/actions/characterActions';
import { RootState } from '/src/redux';

import { Armor } from '/src/types';
import TextInput from '../common/TextInput';
import ArmorForm from './ArmorForm';
import SummaryDR from './SummaryDR';
import DamageTray from './DamageTray';
import HPField from './HPField';

const CalcForm = ({
  armorStack,
  hp,
  currHP,
  summaryDR,
  addArmor,
  removeArmor,
  resetHP,
}: Props) => {
  // This is a crude way to generate unique id's. Use the largest known ID as
  // the starting point.
  const [idCount, setIdCount] = useState(
    armorStack.length === 0
      ? 0
      : armorStack.reduce((prev: Armor, current: Armor) => {
          return prev.id > current.id ? prev : current;
        }).id
  );

  useEffect(() => {
    if (armorStack.length > 0) {
      let value = armorStack.reduce((acc: number, armor: Armor) => {
        return acc + armor.dr;
      }, 0);
      setDR(value);
    }
  }, [armorStack]);

  const collapseSubject = new Subject<void>();

  const handleCollapse = () => {
    collapseSubject.next();
  };

  // only used for summary DR convenience interaction
  const [dr, setDR] = useState(summaryDR ? summaryDR : 0);

  const defaultArmor: Armor = {
    id: idCount,
    order: 0,
    name: 'Armor',
    dr: 0,
    ablative: false,
    ablateBase: 0,
    vulnerabilities: [],
  };

  function handleAddArmor() {
    if (armorStack.length === 0) {
      // Set DR to current DR if initializing stack
      addArmor({ ...defaultArmor, dr, order: armorStack.length });
    } else {
      addArmor({ ...defaultArmor, order: armorStack.length });
    }
    setIdCount(idCount + 1);
  }

  function handleReset() {
    resetHP();
  }

  return (
    <div className='container card'>
      <div className='row g-2 m-2'>
        <div className='col-md-4 col-6'>
          <TextInput id='Name' label='Name' accLabel='Name' />
        </div>
      </div>
      <div className='row g-2 m-2 justify-content-center'>
        <div className='col-md-4 col-6'>
          <HPField />
        </div>
        <div className='col-md-4 col-6'>
          <SummaryDR propDR={dr} setPropDR={setDR} />
        </div>
      </div>
      <div className='row g-2 mb-2'>
        <div className='col-md-1 col-2 mx-1'>
          <button className='btn btn-outline-success' onClick={handleAddArmor}>
            <i className='fs-3 d-flex align-items-top bi bi-shield-fill-plus'></i>
          </button>
        </div>
        <div className='col mx-1'>
          <button
            className='btn btn-outline-primary mx-1'
            onClick={handleCollapse}
            disabled={armorStack.length === 0}
          >
            Collapse All
          </button>
          <button
            className='btn btn-outline-primary mx-1'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className='col-md-4 col-4 mx-1'></div>
      </div>
      {armorStack
        .sort((a: Armor, b: Armor) => a.order - b.order)
        .map((armor: Armor) => {
          return (
            <ArmorForm
              key={armor.id}
              armor={armor}
              removeArmor={removeArmor}
              collapse={collapseSubject}
            ></ArmorForm>
          );
        })}
      <div className='card-body'>
        <DamageTray />
      </div>
    </div>
  );
};

interface OwnProps {
  summaryDR: number;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    armorStack: state.armorStack,
    summaryDR: ownProps.summaryDR,
  };
}

const mapDispatchToProps = {
  addArmor,
  removeArmor,
  resetHP,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(CalcForm);
