import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '../components/InputField';

describe('InputField Component', () => {
  test('renders input field with correct props', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        value=""
        onChange={handleChange}
        inputRef={null}
        isDisabled={false}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('disables input field when isDisabled is true', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
        inputRef={null}
        isDisabled={true}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
