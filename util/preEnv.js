const fs = require('fs-extra');
const path = require('path');
const { tEcho } = require('tmind-core');
const pkg = require('../package.json');
const terminate = require('./terminate.js');
const questionExec = require('./questionExec');
const getOsUserFolder = require('./getOsUserFolder');

// @ts-ignore
const getRepoRoot = () => path.resolve(getOsUserFolder(), '.tMind');

/** 当前项目依赖的根仓库路径
 */
 const checkRepoRoot = () => {
	try {
		const [a] = fs.readFileSync(getRepoRoot()).toString().split('\n').filter((v) => v.startsWith('ROOT_REPO='));
		const b = a.split('=');
		return !!(b[1]);
	} catch (err) {
		return false;
	}
};

const preEnv = async () => {
	try {
		if (!checkRepoRoot()) {
			tEcho('tMind-Cli初始化....', 'Step0 - 初始化：', 'INFO');
			const val = `${await questionExec('00000')}`.replace(/\\\\|\\/g, '/');
			fs.writeFileSync(getRepoRoot(), `ROOT_REPO=${val}\nVER=${pkg.version}\nAUTHOR=${pkg.author}`);
		}
	} catch (err) {
		tEcho(err, 'tMind-Cli初始化异常', 'ERR');
		process.exit();
	}
};

module.exports = preEnv;
