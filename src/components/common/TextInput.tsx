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
  inline = false,
}: Props) => {
  if (inline) {
    return (
      <div className='row'>
        <label
          htmlFor={id ? id : ''}
          className={
            'col col-form-label' + (labelClass ? ' ' + labelClass : '')
          }
        >
          {label}
        </label>
        <div className='col'>
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
      </div>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
};

interface Props {
  id?: string;
  label: string;
  placeholder?: string;
  value?: any;
  active?: boolean;
  onChange?: (event: React.SyntheticEvent) => any | void;
  accLabel?: string;
  labelClass?: string;
  inline?: boolean;
}

export default TextInput;
