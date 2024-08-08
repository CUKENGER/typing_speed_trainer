import React, { useState } from "react";
import TypingText from "../components/TypingText";
import InputField from "../components/InputField";
import Results from "../components/Results";
import useTypingTest from "../hooks/useTypingTest";
import TimeSelector from "../components/TimeSelector";

const texts = [
  `the quick brown fox jumps over the lazy dog repeatedly without ever 
  stopping to rest or slow down it continues to leap across the vast open field as 
  the sun sets in the distance casting long shadows on the ground the fox is 
  agile and swift navigating through the tall grass with ease while the dog 
  watches curiously from a distance wondering what adventures await`,

  `a journey of a thousand miles begins with a single step each 
  step you take brings you closer to your destination and though the path may 
  be long and winding persistence will ultimately lead you to your goal 
  embrace the challenges along the way for they are the stepping stones to 
  success and remember that every great achievement was once considered impossible`,

  `all work and no play makes jack a dull boy but if jack balances his 
  time between work and play he will find that he is both productive and happy 
  engaging in leisure activities allows the mind to recharge fostering creativity 
  and inspiration whether its reading a book going for a walk or spending time 
  with friends finding joy in life is essential for overall well being`,

  `to be or not to be that is the question whether tis nobler in 
  the mind to suffer the slings and arrows of outrageous fortune or to 
  take arms against a sea of troubles and by opposing end them the contemplation 
  of existence and the choices we make shape our destiny life is a series of 
  decisions each with its own consequences and it is up to us to navigate through them`,

  `practice makes perfect so keep on typing even when your fingers are 
  tired or your mind starts to wander the more you practice the faster and 
  more accurate you will become improving your skills every day remember 
  consistency is key set aside time each day to hone your craft and soon you 
  will notice significant progress in your abilities and confidence as a typist`
];


const Home = () => {
  const [selectedTime, setSelectedTime] = useState(null); // Начальное состояние времени
  const {
    input,
    currentText,
    isCompleted,
    time,
    wpm,
    errors,
    inputRef,
    handleInputChange,
    resetTest,
  } = useTypingTest(texts, selectedTime, !!selectedTime); // Передаем состояние выбора времени

  const handleRestart = () => {
    setSelectedTime(null); // Сбрасываем выбор времени
    resetTest(); // Сбрасываем тест
  };

  return (
    <div className="flex flex-col items-center gap-y-[50px]">
      <h1>Typing Speed Trainer</h1>
      {!selectedTime ? (
        <TimeSelector setSelectedTime={setSelectedTime} />
      ) : (
        <>
          <p>Выбранное время: {selectedTime} секунд</p>
          <TypingText text={currentText} input={input} />
          <InputField
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            inputRef={inputRef}
            isDisabled={isCompleted}
          />
          <p>Оставшееся время: {Math.max(time, 0)}</p>
          {isCompleted && (
            <Results
              wpm={wpm}
              errors={errors}
              resetGame={handleRestart} // Обновляем обработчик сброса
            />
          )}
          <button
            data-testid="restart-button"
            className="px-[12px] py-[7px] bg-slate-700 rounded-lg"
            onClick={handleRestart} // Используем обновленный обработчик сброса
          >
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
