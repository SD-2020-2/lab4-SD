var socket = io.connect('/clients', { forceNew: true });

socket.on('time', function (data) {
	console.log(data);
	render(data);
});

function render(data) {
	var html = data
		.map(function (elem, index) {
			return `<div>
              <em>${elem.text}</em>
            </div>`;
		})
		.join(' ');

	document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
	terminal.stdin.write('date --set "2021-04-07 17:27"');
	terminal.stdin.end();
	return true;
}
