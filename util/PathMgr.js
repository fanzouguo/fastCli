const fs = require('fs-extra');
const path = require('path');
const glob = require('glob-all');

const PATH_DEBUG = '.debug';
const PATH_DOC = 'doc';
const PATH_EXAMPLE = 'example';
const PATH_SCR = 'scr';
const PATH_TEST = 'test';
const PATH_TPL = 'src/@tpl';
const PATH_TYPES = 'src/types';
const PATH_VSCODE = '.vscode';

const fmtPath = (pathStr) => pathStr.replace(/\\\\|\\/g, '/');

class PathMgr {
	#basePath = '';
	/** 启动文件（JS或TS）所在的当前路径
	 */
	constructor() {
		this.#basePath = fmtPath(process.cwd());
	}

	/** 当前实例根路径
	 *
	 */
	get rootPath() {
		return this.#basePath;
	}

	/** 当前实例根路径对应的文件夹名称
	 *
	 */
	get rootFolder() {
		return path.parse(this.rootPath).base;
	}

	/** 模版路径
	 */
	get tplPath() {
		return fmtPath(path.resolve(this.#basePath, PATH_TPL));
	}

	/** 模版路径对应的文件夹名称
	 */
	get tplFolder() {
		return path.parse(this.tplPath).base;
	}

	/** 获取本服务实例中所需的地址构造
	 * @param suffix 基于服务实例根地址的其他路径后缀
	 */
	getPath(useRootPath, ...suffix) {
		if (suffix.length > 1) {
			return fmtPath(path.resolve(useRootPath ? this.#basePath: '', ...suffix));
		} else if (suffix.length === 1) {
			const [a] = suffix;
			const preStr = (a === 'debug' && PATH_DEBUG) ||
				(a === 'doc' && PATH_DOC) ||
				(a === 'example' && PATH_EXAMPLE) ||
				(a === 'src' && PATH_SCR) ||
				(a === 'test' && PATH_TEST) ||
				(a === 'tpl' && PATH_TPL) ||
				(a === 'types' && PATH_TYPES) ||
				(a === 'vscode' && PATH_VSCODE) ||
				a;
			return fmtPath(path.resolve(useRootPath ? this.#basePath: '', preStr));
		} else {
			return useRootPath ? this.#basePath: '';
		}
	}

	/** 确认路径是否存在，如果不存在，则创建
	 * @param pathStr 要判断的路径字符串
	 */
	prePath(pathStr) {
		fs.ensureDir(pathStr);
	}

	/** 判断指定路径的文件是否存在
	 *
	 * @param pathStr 要判断的文件全路径
	 * @returns
	 */
	isExist(pathStr) {
		return !!(glob.sync(pathStr).length);
	}

	/** 调用 nodejs:path的 parse方法
	 *
	 * @param pathStr 要解析的路径
	 * @returns
	 */
	parse(pathStr) {
		return path.parse(pathStr);
	}
}

module.exports = PathMgr;
