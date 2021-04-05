var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let date = new Date();
const exec = require('child_process').exec;
var messages = [
	{
		text: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
	},
];

app.get('/time', (req, res) => {
	let date = new Date();
	let seconds = date.getSeconds();
	let minutes = date.getMinutes();
	let hour = date.getHours();

	res.json({ hour: hour, minutes: minutes, seconds: seconds });
});

app.use(express.static('public'));

app.get('/hello', function (req, res) {
	res.status(200).send('Hello World!');
});

io.of('clients').on('connection', (socket) => {
	console.log('A new user connected');
	socket.emit('time', messages);
});

setTimeout(function () {
	var event = setInterval(function () {
		let date = new Date();
		messages = [
			{
				text: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
			},
		];
		io.of('clients').emit('time', messages);
	}, 1000);
}, 2000);

function changeHour(e) {
	exec('bash main.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
		} else {
			console.log('logrado Hora cambiada');
		}
	});
}

server.listen(8080, function () {
	console.log('Servidor corriendo en http://localhost:8080');
});
