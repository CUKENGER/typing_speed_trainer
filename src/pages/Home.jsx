import React from "react";
import TypingText from "../components/TypingText";
import InputField from "../components/InputField";
import Results from "../components/Results";
import useTypingTest from "../hooks/useTypingTest";

// Массив текстов для выбора
const texts = [
  `the quick brown fox jumps over the lazy dog repeatedly without ever stopping to rest or slow down it continues to leap across the vast open field as the sun sets in the distance casting long shadows on the ground`,
  `a journey of a thousand miles begins with a single step each step you take brings you closer to your destination and though the path may be long and winding persistence will ultimately lead you to your goal`,
  `all work and no play makes jack a dull boy but if jack balances his time between work and play he will find that he is both productive and happy ready to take on any challenge that comes his way`,
  `to be or not to be that is the question whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune or to take arms against a sea of troubles and by opposing end them`,
  `practice makes perfect so keep on typing even when your fingers are tired or your mind starts to wander the more you practice the faster and more accurate you will become improving your skills every day`
];

const Home = () => {
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
  } = useTypingTest(texts);

  return (
    <div className="flex flex-col items-center gap-y-[50px]">
      <h1>Typing Speed Trainer</h1>
      <TypingText 
        text={currentText} 
        input={input} 
      />
      <InputField 
        value={input} 
        onChange={(e) => handleInputChange(e.target.value)} 
        inputRef={inputRef} 
        isDisabled={isCompleted} 
      />
      <p>{Math.round(time)}</p>
      {isCompleted && (
        <Results 
          wpm={wpm} 
          errors={errors} 
          resetGame={resetTest} 
        />)}
      <button 
        className="px-[12px] py-[7px] bg-slate-700 rounded-lg" 
        onClick={resetTest}
      >
        Restart
      </button>
    </div>
  );
};

export default Home;
