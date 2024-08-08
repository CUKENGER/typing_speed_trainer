import { useState, useEffect, useRef } from "react";

const useTypingTest = (texts, initialTime = 30, isTimeSelected) => {
  const [input, setInput] = useState("");
  const [currentText, setCurrentText] = useState(texts[0]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && isTimeSelected) {
      inputRef.current.focus(); // Устанавливаем фокус на поле ввода при загрузке
    }
  }, [isCompleted, isTimeSelected]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
        if (Date.now() - startTime >= initialTime * 1000) {
          completeTest();
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  useEffect(() => {
    if (isCompleted) {
      if (inputRef.current) inputRef.current.blur();
      const wordsTyped = input.trim().split(/\s+/).length;
      setWpm(Math.round((wordsTyped / initialTime) * 60));
      setErrors(input.split("").filter((char, index) => char !== currentText[index]).length);
    } else {
      setErrors(input.split("").filter((char, index) => char !== currentText[index]).length);
    }
  }, [input, isCompleted]);

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
    if (inputRef.current && isTimeSelected) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (value) => {
    if (!startTime) setStartTime(Date.now());
    if (isCompleted || !isTimeSelected) return; // Не обрабатывать ввод, если время не выбрано

    if (value.length < input.length) {
      const lastInputSpace = input.lastIndexOf(' ') + 1;
      const lastValueSpace = value.lastIndexOf(' ') + 1;

      if (lastValueSpace >= lastInputSpace) {
        setInput(value);
      }
    } else {
      const lastChar = value[value.length - 1];
      const upcomingChar = currentText[input.length];

      if (lastChar === " " && upcomingChar !== " ") return;

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
