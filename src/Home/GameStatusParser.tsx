interface GameStatus {
  actualGameStatus: string;
  gameStatusCode: number;
  statusTitleStyle: string;
}

function GameStatusParser(status: any, linescore: any): GameStatus {
  let statusCode: number = 0;
  let periodDescription: string = linescore.currentPeriodOrdinal;
  const remainingTime: string = linescore.currentPeriodTimeRemaining;
  let titleStatus: string = '';
  let style: string = '';
  const isOT: boolean = periodDescription === 'OT';
  const isSO: boolean = periodDescription === 'SO';
  if (periodDescription === 'SO') {
    periodDescription = 'ShootOut';
  }
  switch (status.detailedState) {
    case 'Final':
      statusCode = 1;
      titleStatus = isOT ? 'Final OT' : isSO ? 'Final SO' : 'Final';
      style = 'statusTitleFinal';
      break;
    case 'Game Over':
      statusCode = 2;
      titleStatus = isOT ? 'GameOver OT' : isSO ? 'GameOver SO' : 'GameOver';
      style = 'statusTitleGameOver';
      break;
    case 'In Progress - Critical':
      statusCode = 3;
      titleStatus = `In Progress - End of Game, ${periodDescription} - ${remainingTime}`;
      style = 'statusTitleCritical';
      break;
    case 'In Progress':
      statusCode = 4;
      titleStatus = `In Progress, ${periodDescription} - ${remainingTime}`;
      style = 'statusTitleInProgress';
      break;
    case 'Pre-Game':
      statusCode = 5;
      titleStatus = 'Pre-Game';
      style = 'statusTitlePreGame';
      break;
    case 'Scheduled':
      statusCode = 6;
      titleStatus = 'Scheduled';
      style = 'statusTitleScheduled';
      break;
    default:
      statusCode = 10;
  }
  return {
    actualGameStatus: titleStatus,
    gameStatusCode: statusCode,
    statusTitleStyle: style,
  };
}

export default GameStatusParser;
