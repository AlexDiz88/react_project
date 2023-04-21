function StatusDateParser(date: string): string {
  const convertedDate = new Date(date).toLocaleString();

  const gameDay = convertedDate.substring(0, 2);
  let gameMonth = convertedDate.substring(3, 5);
  const gameTime = `${convertedDate.substring(12, 17)} (Local Time)`;
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

export default StatusDateParser;
