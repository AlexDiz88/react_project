import React from 'react';
import DateButton from '../DateButton/DateButton';
import style from './ButtonGroup.module.css';

interface Props {
  selectedDate: Date;
  onDateChange: (dateOnBtn: Date) => void;
}

function ButtonGroup({ selectedDate, onDateChange }: Props): JSX.Element {
  const handleButtonClick = (date: Date): void => {
    onDateChange(date);
  };

  const dayBefore = new Date(selectedDate);
  dayBefore.setDate(selectedDate.getDate() - 1);
  const dayAfter = new Date(selectedDate);
  dayAfter.setDate(selectedDate.getDate() + 1);

  return (
    <div className={style.wrapper}>
      <DateButton date={dayBefore} onClick={handleButtonClick} isSelected={false} />
      <DateButton date={selectedDate} onClick={handleButtonClick} isSelected />
      <DateButton date={dayAfter} onClick={handleButtonClick} isSelected={false} />
    </div>
  );
}

export default ButtonGroup;
