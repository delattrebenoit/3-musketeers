'use strict';

// Importer les librairie
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');


//recupere l url du court actuel de la monnaie dans le fichier constants.js
const {API} = require('./constants');

//fonction utilise dans index.js 
const cash = async command => {
	const {amount} = command
	//Récupérer et utiliser les attributs de command pour la conversion 
	
	const amount = command.amount;
	const from = command.from.toUpperCase();
	const to = command.to.filter(item => item !== from).map(item => item.toUpperCase());

	//apparence des resultat dans la console
	console.log();
	const loading = ora({
		text: 'Converting...',
		color: 'green',
		spinner: {
			interval: 150,
			frames: to
		}
	});

	loading.start();

	//recupere les donné de l url
	await got(API, {
		json: true
	}).then(response => {
		
		money.base = response.body.base;
		money.rates = response.body.rates;

		//Affiche pour chaque item la maonnaie convertie en une autre avec 3 decimal
		to.forEach(item => {
			if (currencies[item]) {
				loading.succeed(`${chalk.green(money.convert(amount, {from, to: item}).toFixed(3))} ${`(${item})`} ${currencies[item]}`);
			} else {
				//erreur
				loading.warn(`${chalk.yellow(`The "${item}" currency not found `)}`);
			}
		});

		//erreur
		console.log(chalk.underline.gray(`\nConversion of ${chalk.bold(from)} ${chalk.bold(amount)}`));
	}).catch(error => {
		if (error.code === 'ENOTFOUND') {
			loading.fail(chalk.red('Please check your internet connection!\n'));
		} else {
			loading.fail(chalk.red(`Internal server error :(\n${error}`));
		}
		process.exit(1);
	});
};


module.exports = cash;