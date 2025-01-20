import { pino } from 'pino';
import { DateTime } from 'luxon';

const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
  level: 'info',
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${DateTime.now().toISO()}"`
});

export default logger;
