import React from 'react';

const TextInput = ({ name, id, label, placeholder, value, accLabel }) => {
  return (
    <div className='float-start'>
      <label
        htmlFor={id ? id : ''}
        className='form-label d-flex justify-content-center'
      >
        {label}
      </label>
      <input
        type='text'
        aria-label={accLabel ? accLabel : label}
        className='form-control'
        id={id ? id : ''}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
