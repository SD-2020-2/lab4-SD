var socket = io.connect('/clients', { forceNew: true });

socket.on('time', function (data) {
	console.log(data);
	render(data);
});

socket.on('table', function (data) {
	console.log(data);
	render2(data);
});

function render(data) {
	console.log('asd');
	var html = data
		.map(function (elem, index) {
			return `<div>
              <em>${elem.text}</em>
            </div>`;
		})
		.join(' ');

	document.getElementById('messages').innerHTML = html;
}

function render2(data) {
	console.log('asd2');
	var html = data
		.map(function (elem, index) {
			return `<div>
              <em>${elem.text}</em>
            </div>`;
		})
		.join(' ');

	document.getElementById('messagestable').innerHTML = html;
}

function addMessage(e) {
	terminal.stdin.write('date --set "2021-04-07 17:27"');
	terminal.stdin.end();
	return true;
}
