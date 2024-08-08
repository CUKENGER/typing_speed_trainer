// src/components/TypingText.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Импортируем jest-dom
import TypingText from '../components/TypingText';

describe('TypingText Component', () => {


  // beforeEach(() => {
  //   jest.useFakeTimers();
  // });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  
  test('renders the correct text', () => {
    const text = "the quick brown fox";
    const input = "";

    render(<TypingText text={text} input={input} />);

    // Проверяем, что весь текст отображается
    const symbols = text.split('')
    expect(screen.getAllByText(symbols)).toBeInTheDocument();
  });

  test('highlights correct characters in green', () => {
    const text = "the quick brown fox";
    const input = "the";

    render(<TypingText text={text} input={input} />);

     // Проверяем, что первые три символа зеленые
    expect(screen.getByText('t')).toHaveClass('text-green-500');
    expect(screen.getByText('h')).toHaveClass('text-green-500');
    expect(screen.getByText('e')).toHaveClass('text-green-500');

    // Проверяем, что остальные символы серые
    expect(screen.getByText(' ')).toHaveClass('text-gray-400'); // Пробел
    expect(screen.getByText('q')).toHaveClass('text-gray-300'); // 
  });

  test('highlights incorrect characters in red', () => {
    const text = "the quick brown";
    const input = "ahx";

    render(<TypingText text={text} input={input} />);

    // Проверяем, что третий символ (который неправильный) красный
    const incorrectChar = screen.getByText(/a/);
    expect(incorrectChar).toHaveClass('text-red-500');
  });

  test('keeps spaces gray', () => {
    const text = "the quick brown";
    const input = "the q";
  
    render(<TypingText text={text} input={input} />);
  
    // Получаем все символы, включая пробелы
    const allChars = screen.getAllByText(/./); 
  
    // Проверяем пробелы
    const spaces = allChars.filter(char => char.textContent === ' ');
    spaces.forEach(space => {
      expect(space).toHaveClass('text-gray-400');
    });
  
    // Проверяем не пробелы
    const nonSpaces = allChars.filter(char => char.textContent !== ' ');
    nonSpaces.forEach(nonSpace => {
      expect(nonSpace).not.toHaveClass('text-gray-400');
    });
  });
  
  

  test('shows blinking cursor at the end of input', () => {
    const text = "the quick brown fox";
    const input = "the quick brown";

    render(<TypingText text={text} input={input} />);

    // Проверяем, что курсор отображается после последнего введенного символа
    expect(screen.getByText('|')).toBeInTheDocument();
  });
});
