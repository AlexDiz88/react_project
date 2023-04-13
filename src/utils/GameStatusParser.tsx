import StatusDateParser from './StatusDateParser';

interface Status {
  title: string;
  code: number;
  style: string;
}

function GameStatusParser(gameData: any): Status {
  let title: string = '';
  let code: number = 0;
  let style: string = '';
  const { currentPeriodOrdinal, currentPeriodTimeRemaining } =
    gameData.liveData.linescore;
  const actualStatus = gameData.gameData.status.detailedState;

  if (actualStatus === 'Scheduled' || actualStatus === 'Pre-Game') {
    title = StatusDateParser(gameData.gameData.datetime.dateTime);
    code = 4;
    style = 'statusTitleScheduled';
  }
  if (actualStatus === 'In Progress') {
    title = `In Progress, ${currentPeriodOrdinal} - ${currentPeriodTimeRemaining}`;
    code = 3;
    style = 'statusTitleInProgress';
  }
  if (actualStatus === 'In Progress - Critical') {
    title = `In Progress - End of Game, ${currentPeriodOrdinal} - ${currentPeriodTimeRemaining}`;
    code = 2;
    style = 'statusTitleCritical';
  }
  if (actualStatus === 'Final' || actualStatus === 'Game Over') {
    const gameEnd =
      currentPeriodOrdinal === 'OT'
        ? 'OT'
        : currentPeriodOrdinal === 'SO'
        ? '[ShootOuts]'
        : '';

    title = `Final ${gameEnd}`;
    code = 1;
    style = 'statusTitleFinal';
  }

  return {
    title,
    code,
    style,
  };
}

export default GameStatusParser;
