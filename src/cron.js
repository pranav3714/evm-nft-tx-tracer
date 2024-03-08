const { CronJob } = require('cron');
const { fixMissingBlocks } = require('./tracer');

const job = new CronJob(
  '0 */1 * * * *', // cronTime
  fixMissingBlocks, // onTick
  null, // onComplete
  true, // start
);
job.start();

// fixMissingBlocks();
