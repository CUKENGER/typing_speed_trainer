import React from 'react';

const TypingText = ({ text, input }) => {
  return (
    <div className="font-bold w-[80%] text-justify text-4xl">
      {text.split('').map((char, index) => {
        let className = 'text-gray-300'; // Обычный цвет текста (серый)

        // Условие для правильного символа
        if (input[index] === char) {
          className = 'text-green-500'; // Правильный символ (зеленый)
        } 
        // Условие для пробела между словами
        else if (char === ' ' && input[index] !== char) {
          className = 'text-gray-400'; // Обычный цвет пробела
        } 
        // Условие для неправильного символа
        else if (input[index] !== undefined && char !== ' ') {
          className = 'text-red-500'; // Неправильный символ (красный)
        }

        return (
          <React.Fragment key={index}>
            <span className={className}>{char}</span>
            {/* Вставляем курсор после текущего символа, если это конец введенного текста */}
            {index === input.length - 1 && input.length !== text.length && (
              <span className="blinking-cursor">|</span>
            )}
          </React.Fragment>
        );
      })}

      {/* Если пользователь ввел весь текст, но курсор еще не отображается */}
      {input.length === text.length && (
        <span className="blinking-cursor">|</span>
      )}
    </div>
  );
};

export default TypingText;
