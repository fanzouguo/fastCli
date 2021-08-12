const { tClear, tEcho } = require('tmind-core');
// const PathMgr = require('./util/PathMgr');
const preEnv = require('./util/preEnv');
const questionExec = require('./util/questionExec');

const start = async () => {
	tClear();
	preEnv();
	const x = await questionExec('10000');
	tEcho(x);
	tEcho('执行完毕', '成功', 'SUCC');
}

start();
