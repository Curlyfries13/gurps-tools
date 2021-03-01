import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { setDamageType } from 'src/redux/actions/damageActions';
import { RootState } from 'src/redux/reducers';

import { DamageTypes } from 'src/types';

const DamageTypeSelection = ({ damageType, setDamageType }: Props) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDamageType(event.target.value);
  };

  return (
    <select
      onChange={handleTypeChange}
      value={damageType}
      className='form-select'
      aria-label='damage type selection'
    >
      {Object.keys(DamageTypes).map((key) => {
        return (
          <option value={key} key={key}>
            {key}
          </option>
        );
      })}
    </select>
  );
};

function mapStateToProps(state: RootState) {
  return {
    damageType: state.damageType,
  };
}

const mapDispatchToProps = {
  setDamageType,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(DamageTypeSelection);
