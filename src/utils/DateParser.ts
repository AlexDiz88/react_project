function DateParser(date: Date): string {
  // корректировка времени и даты под формат EDT для получения корректного списка матчей
  const dateEDT = date.toLocaleString('en-US', { timeZone: 'America/New_York' });
  const delimeter = dateEDT.indexOf(',');
  const splittedDate = dateEDT.substring(0, delimeter).split('/');

  const day = splittedDate[1];
  const month = splittedDate[0];
  const year = splittedDate[2];
  return `${year}-${month}-${day}`;
}

export default DateParser;
