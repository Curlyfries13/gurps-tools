import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '/src/redux';

const Log = ({ log }: Props) => {
  if (log.length > 0) {
    return (
      <div className='container p-2 bg-dark'>
        {log.map((entry: string) => {
          return <p className='text-light'>{entry}</p>;
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

function mapStateToProps(state: RootState) {
  const props: { log: string[] } = {
    log: state.log,
  };
  return props;
}

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Log);
