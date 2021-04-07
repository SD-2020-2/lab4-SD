var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let date = new Date();
var terminal = require('child_process').spawn('bash');

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

	res.send({ hour: hour, minutes: minutes, seconds: seconds });
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

app.post('/setTime', function (req, res) {
	console.log(req);
	terminal.stdin.write('date --set "2021-04-07 17:27"');
	terminal.stdin.end();
	res.status(200).send('Hello World!');
});

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
