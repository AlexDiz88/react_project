import React from 'react';
import style from './DateButton.module.css';

interface Props {
  name: string;
  date: Date;
  onClick: (dateOnBtn: Date) => void;
  isSelected: boolean;
}

// eslint-disable-next-line object-curly-newline
function DateButton({ name, date, onClick, isSelected }: Props): JSX.Element {
  const handleClick = (): void => {
    onClick(date);
  };

  const buttonClassName = isSelected ? `${style.btn} ${style.selected}` : style.btn;

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let monthAbbreviation: string = '';
  switch (month) {
    case 0:
      monthAbbreviation = 'January';
      break;
    case 1:
      monthAbbreviation = 'February';
      break;
    case 2:
      monthAbbreviation = 'March';
      break;
    case 3:
      monthAbbreviation = 'April';
      break;
    case 4:
      monthAbbreviation = 'May';
      break;
    case 5:
      monthAbbreviation = 'June';
      break;
    case 6:
      monthAbbreviation = 'July';
      break;
    case 7:
      monthAbbreviation = 'August';
      break;
    case 8:
      monthAbbreviation = 'September';
      break;
    case 9:
      monthAbbreviation = 'October';
      break;
    case 10:
      monthAbbreviation = 'November';
      break;
    case 11:
      monthAbbreviation = 'December';
      break;
  }

  const dateOnButton = `${day} ${monthAbbreviation} ${year}`;

  return (
    <div>
      <button type="button" className={buttonClassName} onClick={handleClick}>
        {isSelected ? dateOnButton : name}
      </button>
    </div>
  );
}

export default DateButton;
