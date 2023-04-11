function DateParser(date: string): string {
  const gameDay = date.substring(8, 10);
  let gameMonth = date.substring(5, 7);
  const gameTime = `${date.substring(11, 16)} (UTC)`;
  switch (gameMonth) {
    case '01':
      gameMonth = 'January';
      break;
    case '02':
      gameMonth = 'February';
      break;
    case '03':
      gameMonth = 'March';
      break;
    case '04':
      gameMonth = 'April';
      break;
    case '05':
      gameMonth = 'May';
      break;
    case '06':
      gameMonth = 'June';
      break;
    case '07':
      gameMonth = 'July';
      break;
    case '08':
      gameMonth = 'August';
      break;
    case '09':
      gameMonth = 'September';
      break;
    case '10':
      gameMonth = 'October';
      break;
    case '11':
      gameMonth = 'November';
      break;
    case '12':
      gameMonth = 'December';
      break;
  }
  return `${gameDay} ${gameMonth} ${gameTime}`;
}

export default DateParser;
