import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  updateDisplayHP,
  updateDisplayCurrHP,
} from 'src/redux/actions/characterActions';
import { RootState } from 'src/redux';

const HPField = ({
  hp,
  currHP,
  updateDisplayHP,
  updateDisplayCurrHP,
}: Props) => {
  function handleUpdateHP(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    updateDisplayHP(value);
  }

  function handleUpdateCurrentHP(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { value } = event.target;
    updateDisplayCurrHP(value);
  }

  // there should only be one of these components: all id's are designated as
  // if this is the case
  return (
    <>
      <label
        htmlFor='max-hp'
        className='col col-form-label d-flex justify-content-center'
      >
        HP
      </label>
      <div className='d-flex'>
        <div>
          <input
            type='text'
            aria-label='current hit points'
            className='form-control'
            id='current-hp'
            value={currHP}
            onChange={handleUpdateCurrentHP}
          />
        </div>
        <p className='fs-4 mx-2 text-muted'>/</p>
        <div>
          <input
            type='text'
            aria-label='total hit points'
            className='form-control'
            id='max-hp'
            value={hp}
            onChange={handleUpdateHP}
          />
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    hp: state.displayHP,
    currHP: state.displayCurrHP,
  };
}

const mapDispatchToProps = {
  updateDisplayHP,
  updateDisplayCurrHP,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(HPField);
