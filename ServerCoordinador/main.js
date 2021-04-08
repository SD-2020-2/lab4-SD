const express = require('express');
const app = express();

const axios = require('axios');
const port = 3000;
var date = new Date(2021, 04, 07, 08, 21, 22, 00); //hora instancia coordinador
var time = new Date(); //hora cuadrada
const { execSync } = require('child_process');
const { stderr } = require('process');
let tiempos = [];
var cont = 0;
let listServer = getInstances();
app.use(express.static('public'));

app.get('/time', (req, res) => {
	axios
		.get(`http://worldtimeapi.org/api/timezone/America/Bogota`)
		.then((response) => {
			date = new Date(response.data.utc_datetime);
			console.log(response.data.utc_datetime);
			var dateAux = new Date();
			console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			console.log(dateAux.getHours() + ':' + dateAux.getMinutes() + ':' + dateAux.getSeconds());
			res.sendStatus(200);
		})
		.catch((error) => {
			res.sendStatus(300);
			console.log(error);
		});
});

app.get('/gettime', (req, res) => {
	console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	var info = date.getTime() + '';
	for (let i = 0; i < listServer.length; i++) {
		axios
			.post(`http://${listServer[i]}:${8080}/time`, info)
			.then((response) => {
				tiempos.push(response.data.diferencia);
			})
			.catch((error) => {
				console.log(error);
				//	res.sendStatus(300);
			});
	}
	res.sendStatus(200);
});

//metodo que envie el promedio de relojes a las instancias
//y cuadrar la hora
app.get('/change', (req, res) => {
	console.log('entra metodo');
	var sum = 0;
	for (let i = 0; i < tiempos.length; i++) {
		sum += tiempos[i];
	}
	console.log('se envia antes' + sum + ':' + tiempos.length);
	var xD = sum / tiempos.length;
	var resultado = xD + '';
	console.log('se envia ' + xD);
	for (let i = 0; i < listServer.length; i++) {
		axios
			.post(`http://${listServer[i]}:${8080}/change`, resultado)
			.then((response) => {
				//res.sendStatus(200);
			})
			.catch((error) => {
				//res.sendStatus(300);
				console.log(error);
			});
	}
});

app.get('/instance', (req, res) => {
	try {
		let containersIps = execSync(
			`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q --filter ancestor=server)`
		).toString();
		containersIps = containersIps.split('\n');
		containersIps.pop();
		res.status(200).send(containersIps);
		// let containersIps = ["1234,566,345", "1234,566,345"];
		res.send(JSON.stringify(containersIps));
	} catch (error) {
		//console.log('Aun no hay contenedores creados !', error.stderr.toString());
		// res.status(404).send([]);
		res.send(JSON.stringify([]));
	}
});
function getInstances() {
	try {
		let list = execSync(
			`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q --filter ancestor=server)`
		).toString();
		list = list.split('\n');
		list.pop();
		return list;
	} catch (error) {
		console.log('Aun no hay contenedores creados !', error.stderr.toString());
		return (list = []);
	}
}
app.post('/instance', (req, res) => {
	let response = execSync(`bash ${__dirname}/../create-instance.sh`).toString();
	console.log(response);
	listServer = getInstances();
	res.status(200).send('Instancia creada !');
});

app.listen(port, () => {
	console.log(`Middleware listening on port: ${port}`);
});
