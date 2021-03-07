import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { updateArmor } from 'src/redux/actions/armorActions';
import { RootState } from 'src/redux/reducers';

import { Armor } from 'src/types';
import { ensureFound, numberPattern } from 'src/utils/jsUtils';
import TextInput from '../common/TextInput';

const DRField = ({ armorId, armor, updateArmor }: Props) => {
  const [maxDR, setMaxDR]: [string, Function] = useState(String(armor.maxDR));
  const [currentDR, setCurrentDR]: [string, Function] = useState(
    String(armor.dr)
  );
  const [maxDRErrors, setMaxDRErrors]: [string[], Function] = useState([]);
  const [currDRErrors, setCurrDRErrors]: [string[], Function] = useState([]);

  useEffect(() => {
    setMaxDR(armor.maxDR);
    setCurrentDR(armor.dr);
  }, [armor.dr, armor.maxDR]);

  function handleTotalDRChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    validateMaxDR(value);
    if (value && value.match(numberPattern) !== null) {
      const maxDR: number = parseInt(value, 10) || 0;
      const updatedArmor: Armor = { ...armor, maxDR: maxDR };
      updateArmor(updatedArmor);
      setCurrentDR(value);
      // reset currDR validation
      validateCurrDR(value);
    }
    setMaxDR(value);
  }

  function handleCurrentDRChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    validateCurrDR(value);
    if (value && value.match(numberPattern) !== null) {
      const dr: number = parseInt(value, 10) || 0;
      const updatedArmor: Armor = { ...armor, dr };
      updateArmor(updatedArmor);
    }
    setCurrentDR(value);
  }

  function validateMaxDR(value: string): void {
    let errorStack: string[] = [];
    if (
      !value ||
      value.match(numberPattern) === null ||
      parseInt(value, 10) < 0
    ) {
      errorStack.push('DR must be a non-negative number');
    }
    setMaxDRErrors(errorStack);
  }

  function validateCurrDR(value: string): void {
    let errorStack: string[] = [];
    if (
      !value ||
      value.match(numberPattern) === null ||
      parseInt(value, 10) < 0
    ) {
      errorStack.push('Current DR must be a non-negative number');
    }
    setCurrDRErrors(errorStack);
  }

  const renderValidationErrors = () => {
    return (
      <>
        {renderErrors(maxDRErrors)}
        {renderErrors(currDRErrors)}
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

  // TODO: update accessibility label to update with
  return (
    <>
      <label className='col col-form-label d-flex justify-content-center'>
        DR
      </label>
      {armor.ablative ? (
        <div className='d-flex my-2'>
          <div>
            <input
              type='text'
              value={currentDR}
              className='form-control'
              onChange={handleCurrentDRChange}
              aria-label='Max Damage Resistence'
            />
          </div>
          <p className='fs-4 mx-2 text-muted'>/</p>
          <div>
            <input
              value={maxDR}
              className='form-control'
              onChange={handleTotalDRChange}
              aria-label='Current Damage Resistence'
            />
          </div>
        </div>
      ) : (
        <TextInput
          value={maxDR}
          onChange={handleTotalDRChange}
          labelClass='d-flex justify-content-center'
          accLabel='Max Damage Resistence'
        />
      )}
      {renderValidationErrors()}
    </>
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

export default connector(DRField);
