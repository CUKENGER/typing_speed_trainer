import { useState, useEffect, useRef } from "react";

const useTypingTest = (texts, initialTime, isTimeSelected) => {
  const [input, setInput] = useState("");
  const [currentText, setCurrentText] = useState(texts[0]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setTime(initialTime)
  }, [initialTime])

  // Устанавливаем фокус на поле ввода при загрузке
  useEffect(() => {
    if (inputRef.current && isTimeSelected) {
      inputRef.current.focus();
    }
  }, [isTimeSelected]);

  // Обновляем таймер
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
      setWpm(Math.round((wordsTyped / (initialTime || 1)) * 60)); // Предотвращаем деление на ноль
      setErrors(input.split("").filter((char, index) => char !== currentText[index]).length);
    } else {
      setErrors(input.split("").filter((char, index) => char !== currentText[index]).length);
    }
  }, [input, isCompleted, currentText, initialTime]);

  // Проверка на завершение теста
  useEffect(() => {
    if (input.length === currentText.length) completeTest();
  }, [input, currentText]);

  const completeTest = () => {
    setIsCompleted(true);
    if (inputRef.current) inputRef.current.blur();
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setIsCompleted(false);
    setTime(initialTime);
    setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (value) => {
    if (!startTime) setStartTime(Date.now());
    if (isCompleted) return;

    const lastChar = value[value.length - 1];
    const upcomingChar = currentText[input.length];

    if (lastChar === " " && upcomingChar !== " ") return;

    if (value.length < input.length) {
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
