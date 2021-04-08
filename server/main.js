var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let date = new Date();
var terminal = require('child_process').spawn('bash');
var exec = require('child_process');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var messages = [
	{
		text: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
	},
];

app.post('/time', (req, res) => {
	var info = Object.keys(req.body)[0];
	var date = new Date(parseInt(info, 10));
	console.log(date);
	console.log(req.body);
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

app.get('/change', function (req, res) {
	console.log('holiwi');
	terminal.stdin.write('sudo date --set "2021-04-07 17:27"');
	terminal.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	terminal.stdin.end();
	res.send('200');
});

server.listen(8080, function () {
	console.log('Servidor corriendo en http://localhost:8080');
});
