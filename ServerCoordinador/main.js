const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
var date = new Date(2021, 04, 07, 08, 17, 40, 00); //hora instancia coordinador
var time = new Date(); //hora cuadrada
const { execSync } = require('child_process');
const { stderr } = require('process');
let tiempos = [];
var cont = 0;

app.get('/time', (req, res) => {
	axios
		.get(`http://worldtimeapi.org/api/timezone/America/Bogota`)
		.then((response) => {
			res.sendStatus(200);
			date = new Date(response.data.utc_datetime);
			console.log(response.data.utc_datetime);
			var dateAux = new Date();
			console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			console.log(dateAux.getHours() + ':' + dateAux.getMinutes() + ':' + dateAux.getSeconds());
		})
		.catch((error) => {
			res.sendStatus(300);
			console.log('error en post usuario');
		});
});

app.get('/gettime', (req, res) => {
	console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	var info = date.getTime() + '';
	axios
		.post(`http://localhost:8080/time`, info)
		.then((response) => {
			tiempos.push(response.data.diferencia);
			res.sendStatus(200);
		})
		.catch((error) => {
			res.sendStatus(300);
			console.log('error en post usuario');
		});
});

//metodo que envie el promedio de relojes a las instancias
//y cuadrar la hora
function sendTime() {
	console.log('entra metodo');
	console.log(tiempos[0]);
}

app.get('/instance', (req, res) => {
	try {
		let containersIps = execSync(
			`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q --filter ancestor=server)`
		).toString();
		containersIps = containersIps.split('\n');
		containersIps.pop();
		res.status(200).send(containersIps);
	} catch (error) {
		console.log('Aun no hay contenedores creados !', error.stderr.toString());
		res.status(404).send([]);
	}
});

app.post('/instance', (req, res) => {
	let response = execSync(`bash ${__dirname}/../create-instance.sh`).toString();
	console.log(response);
	res.status(200).send('Instancia creada !');
});

app.listen(port, () => {
	console.log(`Middleware listening on port: ${port}`);
});
