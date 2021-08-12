const inquirer = require('inquirer');
const questionObj = require('../@question');

const execer = async (queKey) =>{
	let _obj = questionObj[queKey];
	return new Promise((resolve) => {
		if (_obj) {
			inquirer.prompt([_obj])
			.then((res) => {
				resolve(res[_obj.name]);
			}).catch(err => {
				resolve('');
			}).finally(() => {
				console.log('Done!'); // eslint-disable-line
			});
		} else {
			resolve('');
		}
	});
};

module.exports = execer;
