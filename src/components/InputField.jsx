import React from 'react';

const InputField = ({ value, onChange, inputRef, isDisabled }) => {
  return (
    <input
      ref={inputRef}
      id='input'
      className='opacity-0 absolute'
      type="text"
      value={value}
      onChange={onChange}
      disabled={isDisabled} // Отключаем поле, если тест завершен
      maxLength={null}
      autoComplete='off'
    />
  );
};

export default InputField;
