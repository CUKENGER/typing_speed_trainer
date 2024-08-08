import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';
import { act } from 'react';

describe('Home Component', () => {
  // beforeEach(() => {
  //   jest.useFakeTimers();
  // });

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers();
  });

  test('shows speed after 30 seconds', async () => {
    // Включаем фиктивные таймеры для управления временем
    jest.useFakeTimers();
  
    render(<Home />);
  
    // Симулируем выбор времени, чтобы тест начался
    fireEvent.click(screen.getByText('30 секунд'));
  
    // Эмулируем ввод текста, чтобы результаты могли появиться
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'the quick brown fox' }, // вводим текст
    });
  
    // Используем `act` для управления таймерами и вызовов изменения состояния
    act(() => {
      jest.advanceTimersByTime(30000); // Пропускаем 30 секунд
    });
  
    // Используйте findByText для ожидания появления элемента
    const speedElement = await screen.findByText(/скорость печати/i);
    expect(speedElement).toBeInTheDocument();
  
    // Возвращаем реальное время после теста
    jest.useRealTimers();
  });

  test('restarts the test when Restart button is clicked', async () => {
    // Рендерим компонент
    render(<Home />);
  
    // Симулируем выбор времени, чтобы тест начался
    fireEvent.click(screen.getByText('30 секунд'));
  
    // Ждем завершения теста (например, можно продвинуть таймер на нужное время)
    act(() => {
      jest.advanceTimersByTime(30000); // Пропускаем 30 секунд
    });
  
    // Теперь кнопка должна быть доступна
    const restartButton = await screen.findByTestId('restart-button');
    
    // Симулируем нажатие на кнопку "Restart"
    fireEvent.click(restartButton);
  
    // Проверяем, что состояние сбросилось, например, снова показывается выбор времени
    expect(screen.getByText('Выберите время:')).toBeInTheDocument();
  });
});
