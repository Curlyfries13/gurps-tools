import React from 'react';

const TextInput = ({
  id,
  label,
  placeholder,
  value,
  active = true,
  onChange,
  accLabel,
  labelClass = '',
}: Props) => {
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

interface Props {
  id?: string;
  label: string;
  placeholder?: string;
  value?: any;
  active?: boolean;
  onChange?: (event: React.SyntheticEvent) => any;
  accLabel?: string;
  labelClass?: string;
}

export default TextInput;
