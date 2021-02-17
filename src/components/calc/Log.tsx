import React, { useRef, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '/src/redux';

const Log = ({ log }: Props) => {
  const logRef = useRef(null);

  const executeScroll = () => {
    if (logRef.current !== null) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    executeScroll();
  }, [log]);

  if (log.length > 0) {
    return (
      <div className='container p-2 bg-dark overflow-auto mh-100' ref={logRef}>
        {log.map((entry: string) => {
          return (
            <p key={log.order} className='text-light'>
              {entry}
            </p>
          );
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
