import React from 'react';

const Results = ({ wpm, errors, resetGame }) => {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto bg-gray-900 
    flex items-center justify-center w-[60%] h-[80%] left-[50%] top-[50%] -translate-y-1/2 
    -translate-x-1/2 rounded-lg flex-col gap-y-[15px]'>
      <h2>Результаты</h2>
      <p>Скорость печати: {wpm} WPM</p>
      <p>Ошибки: {errors}</p>
      <button onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

export default Results;
