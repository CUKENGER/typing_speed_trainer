import { renderHook, act } from '@testing-library/react';
import useTypingTest from '../hooks/useTypingTest';

describe('useTypingTest Hook', () => {
  const texts = ['hello world', 'goodbye world'];

  test('should initialize correctly', () => {
    const { result } = renderHook(() => useTypingTest(texts, 30, true));
    expect(result.current.input).toBe('');
    expect(result.current.currentText).toBe(texts[0]);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.time).toBe(30);
    expect(result.current.wpm).toBe(0);
    expect(result.current.errors).toBe(0);
  });

  test('should handle input changes', () => {
    const { result } = renderHook(() => useTypingTest(texts, 30, true));
    act(() => {
      result.current.handleInputChange('hello');
    });
    expect(result.current.input).toBe('hello');
  });

  test('should complete the test when input matches currentText', () => {
    const { result } = renderHook(() => useTypingTest(texts, 30, true));
    act(() => {
      result.current.handleInputChange('hello world');
    });
    expect(result.current.isCompleted).toBe(true);
  });

  test('should reset the test', () => {
    const { result } = renderHook(() => useTypingTest(texts, 30, true));
    act(() => {
      result.current.handleInputChange('hello world');
      result.current.resetTest();
    });
    expect(result.current.input).toBe('');
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.time).toBe(30);
  });
});
