const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
var date = new Date(2021, 04, 07, 08, 54, 00, 00);
var time = new Date();

app.get('/time', (req, res) => {
	axios
		.get(`http://worldtimeapi.org/api/timezone/America/Bogota`)
		.then((response) => {
			res.sendStatus(200);
			date = new Date(response.data.utc_datetime);
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
	axios
		.get(`http://localhost:8080/time`)
		.then((response) => {
			let endTime = new Date().getTime();
			const travelTime = (endTime - date.getTime()) / 2;
			let newTime = new Date();
			newTime.setHours(response.data.hour);
			newTime.setMinutes(response.data.minutes);
			newTime.setSeconds(response.data.seconds);
			console.log(newTime.getHours() + ':' + newTime.getMinutes() + ':' + newTime.getSeconds());
			newTime.setTime(newTime.getTime() + travelTime);
			time = newTime;
			console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
			sendTime();
			res.send('Ok');
		})
		.catch((error) => {
			res.sendStatus(300);
			console.log(error);
		});
});

function sendTime() {
	axios
		.post(`http://localhost:8080/setTime`, time)
		.then((response) => {})
		.catch((error) => {
			console.log(error);
		});
}

app.listen(port, () => {
	console.log(`Middleware listening on port: ${port}`);
});
