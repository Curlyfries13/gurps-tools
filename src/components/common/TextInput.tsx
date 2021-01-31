import React from 'react';

const TextInput = ({
  name,
  id,
  label,
  placeholder,
  value,
  active = true,
  onChange,
  accLabel,
  labelClass = '',
}) => {
  return (
    <div className='float-start'>
      <label
        htmlFor={id ? id : ''}
        className={'form-label' + (labelClass ? ' ' + labelClass : '')}
      >
        {label}
      </label>
      <input
        type='text'
        aria-label={accLabel ? accLabel : label}
        className='form-control'
        id={id ? id : ''}
        readOnly={!active}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
