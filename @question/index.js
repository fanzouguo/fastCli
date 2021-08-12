const _obj = {
	'00000': {
		type: 'input',
		message: '请输入工作区根仓库的完整路径',
		name: 'ROOT_REPO'
	},
	'10000': {
		type: 'list',
		name: 'ENV_SELECT',
		message: '请选择后续操作的路径：\n-------------------------------------------------------------\n',
		choices: [
			{
				key: 'c',
				name: '当前路径',
				value: 'currPath'
			},
			{
				key: 'f',
				name: '当前路径下的新文件夹',
				value: 'newFolder'
			},
			{
				key: 'g',
				name: 'Github克隆',
				value: 'gitPath'
			}
		]
	}
};

module.exports = _obj;
