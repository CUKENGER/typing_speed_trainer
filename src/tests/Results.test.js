import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '../components/Results';

describe('Results Component', () => {
  test('renders results with correct values and calls resetGame on button click', () => {
    const handleReset = jest.fn();
    
    render(<Results wpm={100} errors={5} resetGame={handleReset} />);
    
    expect(screen.getByText(/скорость печати: 100 WPM/i)).toBeInTheDocument();
    expect(screen.getByText(/ошибки: 5/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/restart/i));
    expect(handleReset).toHaveBeenCalled();
  });
});
