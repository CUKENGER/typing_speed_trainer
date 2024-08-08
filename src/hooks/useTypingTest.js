import { useState, useEffect, useRef } from "react";

const useTypingTest = (texts, initialTime, isTimeSelected) => {
  const [input, setInput] = useState(""); // Текущий текст, введённый пользователем
  const [currentText, setCurrentText] = useState(texts[0]); // Текущий текст для набора
  const [isCompleted, setIsCompleted] = useState(false); // Флаг завершения теста
  const [time, setTime] = useState(initialTime); // Оставшееся время
  const [wpm, setWpm] = useState(0); // Слова в минуту
  const [errors, setErrors] = useState(0); // Количество ошибок
  const [startTime, setStartTime] = useState(null); // Время начала теста
  const inputRef = useRef(null); // Ссылка на поле ввода

  // Обновляем время при изменении initialTime
  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  // Устанавливаем фокус на поле ввода при выборе времени
  useEffect(() => {
    if (inputRef.current && isTimeSelected) {
      inputRef.current.focus();
    }
  }, [isTimeSelected]);

  // Обновляем таймер каждую секунду
  useEffect(() => {
    if (startTime && !isCompleted) {
      const interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            completeTest();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isCompleted]);

  // Обновляем ошибки и WPM
  useEffect(() => {
    if (isCompleted) {
      if (inputRef.current) inputRef.current.blur();
      const wordsTyped = input.trim().split(/\s+/).length;
      setWpm(Math.round((wordsTyped / (initialTime || 1)) * 60)); // Защита от деления на ноль
      setErrors(countErrors());
    } else {
      setErrors(countErrors());
    }
  }, [input, isCompleted, currentText, initialTime]);

  // Функция для подсчета ошибок
  const countErrors = () => {
    return input.split("").filter((char, index) => char !== currentText[index]).length;
  };

  // Проверка на завершение теста
  useEffect(() => {
    if (input.length === currentText.length) completeTest();
  }, [input, currentText]);

  // Завершение теста
  const completeTest = () => {
    setIsCompleted(true);
    if (inputRef.current) inputRef.current.blur();
  };

  // Сброс теста
  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setIsCompleted(false);
    setTime(initialTime);
    setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
    if (inputRef.current) inputRef.current.focus();
  };

  // Обработка изменения ввода
  const handleInputChange = (value) => {
    if (!startTime) setStartTime(Date.now());
    if (isCompleted) return;

    const lastChar = value[value.length - 1];
    const upcomingChar = currentText[input.length];

    // Проверка корректности пробела
    if (lastChar === " " && upcomingChar !== " ") return;

    if (value.length < input.length) {
      // Удаление символов
      const lastInputSpace = input.lastIndexOf(' ') + 1;
      const lastValueSpace = value.lastIndexOf(' ') + 1;

      if (lastValueSpace >= lastInputSpace) {
        setInput(value);
      } else {
        setInput(input.slice(0, lastInputSpace));
      }
    } else {
      setInput(value);
    }
  };

  return {
    input,
    currentText,
    isCompleted,
    time,
    wpm,
    errors,
    inputRef,
    handleInputChange,
    resetTest,
  };
};

export default useTypingTest;
