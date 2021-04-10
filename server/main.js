var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let date = new Date();
var exec = require('child_process');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var infotable = 'hola';
var messages = [
	{
		text: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
	},
];

var messagestable = [
	{
		text: infotable,
	},
];

app.post('/time', (req, res) => {
	var info = Object.keys(req.body)[0];
	var date = new Date(parseInt(info, 10));
	var dateI = new Date();
	var oper = date - dateI;
	console.log('diferencia ' + oper);
	res.send({ diferencia: oper });
});

app.use(express.static('public'));

app.get('/hello', function (req, res) {
	res.status(200).send('Hello World!');
});

io.of('clients').on('connection', (socket) => {
	console.log('A new user connected');
	socket.emit('time', messages);
	socket.emit('table', messagestable);
});

setTimeout(function () {
	var event = setInterval(function () {
		let date = new Date();
		messages = [
			{
				text: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
			},
		];
		console.log(messages);
		messagestable = [
			{
				text: infotable,
			},
		];
		io.of('clients').emit('time', messages);
		io.of('clients').emit('table', messages);
	}, 1000);
}, 2000);

app.post('/change', function (req, res) {
	var info = Object.keys(req.body)[0];
	var date = new Date();
	console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	var milis = date.getTime() + parseInt(info, 10);
	console.log(milis);
	let newDate = new Date(milis);
	infotable +=
		date.getHours() +
		':' +
		date.getMinutes() +
		':' +
		date.getSeconds() +
		'  ' +
		milis +
		'  ' +
		newDate.getHours() +
		':' +
		newDate.getMinutes() +
		':' +
		newDate.getSeconds();
	console.log(newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds());
	res.send('200');
});

app.post('/change', function (req, res) {
	console.log('holiwi');
	let { hora, minuto, segundo } = req.body;

	terminal.stdin.write(`sudo date --set "2021-04-08 ${hora}:${minuto}:${segundo}"`);
	terminal.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	terminal.stdin.end();
	res.send('200');
});

server.listen(8080, function () {
	console.log('Servidor corriendo en http://localhost:8080');
});
