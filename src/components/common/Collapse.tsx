import React, { useRef } from 'react';
import AnimateHeight from 'react-animate-height';

const Collapse = (props: any) => {
  return (
    <AnimateHeight
      duration={350}
      height={props.isOpen ? 'auto' : 0}
      contentClassName={props.className}
      role={props.role ?? ''}
      aria-label={props['aria-label'] ?? ''}
    >
      {props.children}
    </AnimateHeight>
  );
};

export default Collapse;
