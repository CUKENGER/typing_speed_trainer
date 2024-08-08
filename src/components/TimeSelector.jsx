

const TimeSelector = ({ setSelectedTime }) => {
  const times = [30, 60, 120]; // Варианты времени (в секундах)

  return (
    <div className="time-selector">
      <label>Выберите время: </label>
      {times.map((time) => (
        <button 
          key={time} 
          onClick={() => setSelectedTime(time)} 
          className="px-[12px] py-[7px] bg-slate-700 rounded-lg m-1"
        >
          {time} секунд
        </button>
      ))}
    </div>
  );
};

export default TimeSelector