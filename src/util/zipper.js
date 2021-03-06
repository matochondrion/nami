const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { getStagingPath } = require('./fileUtils');

const namiErr = require('../util/errorLogger');

const cwd = process.cwd();

const unzipper = async (lambdaName) => {
  const file = `${cwd}/${lambdaName}/${lambdaName}.zip`;

  try {
    await exec(`unzip ${file}`, { cwd: `${cwd}/${lambdaName}` });
  } catch (err) {
    namiErr(err);
  }
};

const zipper = async (lambdaName, homedir, directoryName) => {
  const stagingPath = getStagingPath(homedir);
  let dirName = directoryName;

  if (dirName === undefined) dirName = lambdaName;
  const dir = `${stagingPath}/${dirName}`;

  try {
    await exec(`zip -r ${lambdaName}.zip .`, { cwd: dir });
  } catch (err) {
    namiErr(err);
  }

  return `${dir}/${lambdaName}.zip`;
};

module.exports = { zipper, unzipper };
